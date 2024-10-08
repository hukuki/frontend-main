import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import useAuthContext from '../context/AuthContextProvider';
import { Dialog } from '@headlessui/react';
import AddPersonToSpacePeopleSearchbar from './AddPersonToSpacePeopleSearchbar';
import clsx from 'clsx';
import useSpaceStore from '../store/spaceStore';

export const AddPersonToSpaceModal = ({ open, onClose, space }) => {
  const { user } = useAuthContext();
  const [peopleToAdd, setPeopleToAdd] = useState([]);
  const updateSpace = useSpaceStore((state) => state.updateSpace);

  const handlePeopleListChange = (newList) => {
    setPeopleToAdd(newList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && peopleToAdd.length > 0) {
      const people = peopleToAdd.map((p) => {
        return {
          user: p._id,
          role: 'observer',
        };
      });
      const res = await fetch('/api/add_people_to_space', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
          spaceId: space._id,
          people,
        }),
      });
      const { error, data } = await res.json();
      if (!error) {
        console.log(data);
        updateSpace(data);
      } else {
        console.log(error);
      }
    }
    onClose();
  };

  return (
    <Dialog as="div" open={open} onClose={onClose} className="relative z-10 min-w-screen">
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel as="div" className="bg-white p-6 rounded-lg flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-2">
              <Dialog.Title as="h3" className="text-xl font-semibold tracking-tight">
                {space.name}
              </Dialog.Title>
              <Dialog.Description as="span" className="text-slate-600">
                Bu projeye yeni kişi ekleyin.
              </Dialog.Description>
              <hr className="h-[2px] rounded-full bg-slate-600/30" />
            </div>
            <div>
              <AddPersonToSpacePeopleSearchbar onPeopleListChange={handlePeopleListChange} />
            </div>
            <div className="flex justify-end items-center mt-2 gap-2">
              <button className="outline-none py-1 px-2 hover:bg-red-400 text-gray-500 hover:text-white rounded-md cursor-pointer" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={peopleToAdd.length === 0}
                className={clsx(
                  'rounded-md py-1 px-2',
                  peopleToAdd.length === 0 ? 'bg-blue-200 text-slate-500' : 'bg-blue-500 text-white hover:bg-blue-600'
                )}
                onClick={(e) => handleSubmit(e)}
              >
                Add to spaces
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPersonToSpaceModal;
