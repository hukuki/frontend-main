import { Dialog } from '@headlessui/react';
import { useState, useEffect, useMemo } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { SpaceSchema } from '../form-schemas/index';
import CreateNewSpacePeopleSearchbar from './CreateNewSpacePeopleSearchbar';

function CreateNewSpaceModal({ open, onClose, onSubmit }) {
  const { user } = useAuthContext();
  const [peopleToShare, setPeopleToShare] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePeopleListChange = (newPeopleList) => {
    setPeopleToShare(newPeopleList);
  };

  const handleCreateSpace = async (values, actions) => {
    setLoading(true);
    const projectName = values.name;
    const description = values.description;
    const peopleIds = peopleToShare.map((person) => person._id);
    const response = await fetch('/api/create_space', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: user.accessToken,
        name: projectName,
        description,
        peopleIds,
      }),
    });
    console.log(response);
    const { error, data } = await response.json();
    console.log(error);
    console.log(data);
    if (!error) {
      console.log(data);
    }
    resetForm();
    onSubmit();
    onClose();
    setLoading(false);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: SpaceSchema,
    onSubmit: handleCreateSpace,
  });

  const isAnyErrors = useMemo(() => {
    return !touched.name || errors.name || !touched.description || errors.description;
  }, [errors, touched]);

  return (
    <Dialog as="div" open={open} onClose={onClose} className="relative z-10 min-w-screen">
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel as="div" className="bg-white p-6 rounded-lg flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-2">
              <Dialog.Title as="h3" className="text-xl font-semibold tracking-tight">
                Create a new project
              </Dialog.Title>
              <Dialog.Description as="span" className="text-slate-600">
                Create a new project and add your collegues
              </Dialog.Description>
              <hr className="h-[2px] rounded-full bg-slate-600/30" />
            </div>
            <form action="" className="flex flex-col gap-6" onSubmit={handleSubmit} autoComplete="off">
              <div className="flex flex-col gap-2">
                <label className={clsx('tracking-tight font-medium', errors.name && touched.name ? 'text-red-500' : '')}>Project name</label>
                <input
                  className={clsx(
                    'p-2 bg-slate-100 rounded-md outline-none text-sm',
                    errors.name && touched.name ? 'ring-1 ring-red-500 text-red-500' : ''
                  )}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter the name for your new project"
                  id="name"
                  name="name"
                />
                {errors.name && touched.name && <p className="text-sm text-red-500">Please enter a valid name for your project</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={clsx('tracking-tight font-medium', errors.description && touched.description ? 'text-red-500' : '')}>
                  Description
                </label>
                <input
                  className={clsx(
                    'p-2 bg-slate-100 rounded-md outline-none text-sm',
                    errors.description && touched.description ? 'ring-1 ring-red-500 text-red-500' : ''
                  )}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter the description of your new project"
                  id="description"
                  name="description"
                />
                {errors.description && touched.description && (
                  <p className="text-sm text-red-500">Please enter a valid description for your project</p>
                )}
              </div>
              <div>
                <CreateNewSpacePeopleSearchbar onPeopleListChange={handlePeopleListChange} />
              </div>

              <div className="flex justify-end items-center mt-2 gap-2">
                <button
                  className="outline-none py-1 px-2 hover:bg-red-400 text-gray-500 hover:text-white rounded-md cursor-pointer"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAnyErrors}
                  className={clsx('rounded-md py-1 px-2', isAnyErrors ? 'bg-blue-200 text-slate-500' : 'bg-blue-500 text-white hover:bg-blue-600')}
                  onClick={(e) => handleSubmit(e)}
                >
                  Add to spaces
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default CreateNewSpaceModal;
