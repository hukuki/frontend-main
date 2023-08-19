import { Combobox, Transition } from '@headlessui/react';
import { useState, useEffect, Fragment } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import { FaSearch, FaAngleDown, FaTimes, FaCheck } from 'react-icons/fa';

function AddPersonToSpacePeopleSearchbar({ onPeopleListChange }) {
  const [peopleToShare, setPeopleToShare] = useState([]);
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPeople() {
      const res = await fetch('/api/get_users', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await res.json();
      if (!error) {
        setPeople(data);
      }
    }
    if (user) {
      getPeople();
    }
  }, [user]);

  useEffect(() => {
    onPeopleListChange(peopleToShare);
  }, [peopleToShare]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        let searchedPeople = people.filter((person) => {
          if (person.email.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        });
        if (searchedPeople.length > 0) {
          setFilteredPeople(searchedPeople);
        }
      } else {
        setFilteredPeople([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm, people]);

  const removeFromPeopleList = (person) => {
    if (peopleToShare.length > 0) {
      const emails = peopleToShare.map((p) => p.email);
      if (emails.includes(person.email)) {
        setPeopleToShare((prev) => {
          return prev.filter((s) => s.email !== person.email);
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-md">
      <span className="tracking-tight font-medium text-md">Kişi ekleyin</span>
      <span className="text-slate-600 text-sm">Projenizde beraber çalışmak istediğiniz kişileri seçin.</span>
      <Combobox value={peopleToShare} onChange={setPeopleToShare} multiple>
        {peopleToShare.length > 0 && (
          <div className="flex flex-row gap-2 text-blue-500 flex-wrap">
            {peopleToShare.map((person) => {
              return (
                <div className="p-2 flex items-center justify-between gap-2 bg-slate-100 rounded-md whitespace-nowrap">
                  <span className="text-sm text-blue-500">{person.email}</span>
                  <FaTimes className="text-sm text-red-400 cursor-pointer" onClick={() => removeFromPeopleList(person)} />
                </div>
              );
            })}
          </div>
        )}
        <div className="relative mt-1">
          <div className="relative w-full bg-white cursor-default overflow-hidden rounded-md text-left focus:outline-none sm:text-sm">
            <div className="flex items-center justify-start bg-slate-100 px-2">
              <FaSearch />
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-md leading-5 text-gray-900 bg-slate-100"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your projects"
              />
            </div>
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <FaAngleDown className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchTerm('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadowring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && searchTerm !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.email}
                    className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-blue-500' : 'text-gray-900'}`}
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate text-md cursor-pointer ${selected ? 'font-medium' : 'font-normal'}`}>{person.email}</span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-blue-500' : 'text-gray-900'}`}>
                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default AddPersonToSpacePeopleSearchbar;
