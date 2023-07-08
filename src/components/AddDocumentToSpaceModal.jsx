import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import ProjectsSearchbar from './ProjectsSearchbar';
import clsx from 'clsx';

function AddDocumentToSpaceModal({ open, onClose, documentId }) {
  const { user } = useAuthContext();
  const [spacesToAdd, setSpacesToAdd] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSpaceListChanged = (newSpaceList) => {
    setSpacesToAdd(newSpaceList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user && spacesToAdd.length > 0) {
      if (spacesToAdd.length === 1) {
        const spaceId = spacesToAdd[0]._id;
        const res = await fetch('/api/add_document_to_space', {
          method: 'POST',
          body: JSON.stringify({
            spaceId: spaceId,
            documentId: documentId,
            accessToken: user.accessToken,
          }),
        });
        const { error, data } = await res.json();
        console.log(error);
        console.log(data);
        if (!error) {
          onClose();
        }
      }
    }
    setLoading(false);
  };

  return (
    <Dialog as="div" open={open} onClose={onClose} className="relative z-10 min-w-screen">
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel as="div" className="bg-white p-4 rounded-lg flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-2">
              <Dialog.Title as="h3" className="text-xl font-semibold tracking-tight">
                Add to your project
              </Dialog.Title>
              <Dialog.Description as="span" className="text-slate-600">
                Add this document to one of your existing projects
              </Dialog.Description>
            </div>
            <div>
              <ProjectsSearchbar onSpaceListChange={handleSpaceListChanged} />
            </div>
            <div className="flex justify-end items-center mt-2 gap-2">
              <button className="py-1 px-2 hover:bg-red-400 text-gray-500 hover:text-white rounded-md cursor-pointer" onClick={onClose}>
                Cancel
              </button>
              <button
                disabled={spacesToAdd.length === 0}
                className={clsx(
                  'rounded-md py-1 px-2',
                  spacesToAdd.length === 0 ? 'bg-blue-200 text-slate-500' : 'bg-blue-500 text-white hover:bg-blue-600'
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
}

export default AddDocumentToSpaceModal;
