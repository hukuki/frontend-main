import { useState, useEffect, Fragment } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import { FaSearch, FaCheck, FaAngleDown, FaTimes } from 'react-icons/fa';
import { Combobox, Transition } from '@headlessui/react';

function ProjectsSearchbar({ onSpaceListChange }) {
  const [spacesToAdd, setSpacesToAdd] = useState([]);
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSpaces() {
      const res = await fetch('/api/get_spaces', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await res.json();
      if (!error) {
        setSpaces(data);
      }
    }
    if (user) {
      getSpaces();
    }
  }, [user]);

  useEffect(() => {
    onSpaceListChange(spacesToAdd);
  }, [spacesToAdd]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        let searchedSpaces = spaces.filter((space) => {
          if (space.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        });
        if (searchedSpaces.length > 0) {
          setFilteredSpaces(searchedSpaces);
        }
      } else {
        setFilteredSpaces([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm, spaces]);

  const removeFromSpaceList = (space) => {
    if (spacesToAdd.length > 0) {
      const ids = spacesToAdd.map((s) => s._id);
      if (ids.includes(space._id)) {
        setSpacesToAdd((prev) => {
          return prev.filter((s) => s._id !== space._id);
        });
      }
    }
  };
  return (
    <div className="mt-2 flex flex-col gap-2 max-w-md">
      <span className="tracking-tight font-medium text-lg">Projelerim</span>
      <Combobox value={spacesToAdd} onChange={setSpacesToAdd} multiple>
        {spacesToAdd.length > 0 && (
          <div className="flex flex-row gap-2 text-blue-500 flex-wrap">
            {spacesToAdd.map((space) => {
              return (
                <div className="p-2 flex items-center justify-between gap-2 bg-slate-100 rounded-md whitespace-nowrap">
                  <span className="text-sm text-blue-500">{space.name}</span>
                  <FaTimes className="text-sm text-red-400 cursor-pointer" onClick={() => removeFromSpaceList(space)} />
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
                placeholder="Projelerimde ara"
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
              {filteredSpaces.length === 0 && searchTerm !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
              ) : (
                filteredSpaces.map((space) => (
                  <Combobox.Option
                    key={space._id}
                    className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-blue-500' : 'text-gray-900'}`}
                    value={space}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate text-md cursor-pointer ${selected ? 'font-medium' : 'font-normal'}`}>{space.name}</span>
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

export default ProjectsSearchbar;
