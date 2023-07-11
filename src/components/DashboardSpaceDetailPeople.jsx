import { useState } from 'react';
import { Avatar } from '@chakra-ui/react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import useAuthContext from '../context/AuthContextProvider';
import AddPersonToSpaceModal from './AddPersonToSpaceModal';

function DashboardSpaceDetailPeople({ space, onAddPerson }) {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddPersonToSpaceModal space={space} open={isOpen} onClose={() => setIsOpen(false)} onSubmit={onAddPerson} />
      <div className="flex flex-col gap-4 p-4 bg-white max-w-screen-sm rounded-xl shadow-lg">
        <div className="flex flex-col gap-4">
          <span className="text-md font-medium tracking-tight">People: </span>
          <div className="flex gap-2 flex-wrap">
            {space.people.length > 0 &&
              space.people.map((contact, index) => {
                return (
                  <div className="relative group z-10">
                    <Avatar size="md" bg="blue.400" textColor="white" key={index} name={contact.email} src={contact.photoURL || null} />
                    <div className="hidden group-hover:block relative">
                      <div className="hidden group-hover:block absolute top-2 bg-white shadow-md p-4 rounded-md text-blue-500">{contact.email}</div>
                    </div>
                    <div className="absolute group/times -top-1 right-0 bg-red-400 aspect-square rounded-full p-[1px] cursor-pointer hover:bg-white hover:ring-1 hover:ring-red-500">
                      <FaTimes className="text-white group-hover/times:text-red-500" />
                    </div>
                  </div>
                );
              })}
            <div
              className="bg-slate-100 flex items-center justify-center aspect-square p-4 rounded-full shadow-xl cursor-pointer hover:shadow-inner "
              onClick={() => setIsOpen(true)}
            >
              <FaPlus className="text-xl text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardSpaceDetailPeople;
