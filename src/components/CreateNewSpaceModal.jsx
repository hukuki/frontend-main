import { Dialog } from '@headlessui/react';
import { useState, useEffect, useMemo } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { SpaceSchema } from '../form-schemas/index';
import CreateNewSpacePeopleSearchbar from './CreateNewSpacePeopleSearchbar';
import useSpaceStore from '../store/spaceStore';
import { useRouter } from 'next/router';
import ErrorModal from './ErrorModal';

function CreateNewSpaceModal({ open, onClose }) {
  const { user } = useAuthContext();
  const [peopleToShare, setPeopleToShare] = useState([]);
  const addSpace = useSpaceStore((state) => state.addSpace);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const router = useRouter();

  const handlePeopleListChange = (newPeopleList) => {
    setPeopleToShare(newPeopleList);
  };

  const handleCreateSpace = async (values, actions) => {
    const projectName = values.name;
    const description = values.description;
    const people = peopleToShare.map((p) => ({
      user: p._id,
      role: 'observer',
    }));
    const response = await fetch('/api/create_space', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: user.accessToken,
        name: projectName,
        description,
        people,
      }),
    });
    const { error, data } = await response.json();
    if (!error) {
      addSpace(data);
    } else {
      setIsErrorModalOpen(true);
    }
    resetForm();
    onClose();
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

  const handleReport = () => {
    router.push('/feedback');
  };

  return (
    <>
      {isErrorModalOpen && (
        <ErrorModal isOpen={isErrorModalOpen} closeModal={() => setIsErrorModalOpen(false)}>
          <ErrorModal.Panel>
            <div className="flex flex-col items-start justify-center gap-4">
              <ErrorModal.Title>Bir hata oluştu</ErrorModal.Title>
              <span className="text-md text-slate-600">Projenizi yaratırken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.</span>
              <div className="w-full flex justify-end gap-2">
                <ErrorModal.Button onClick={() => setIsErrorModalOpen(false)}>Anladım</ErrorModal.Button>
                <ErrorModal.Button onClick={handleReport} className="bg-orange-100 focus-visible:ring-orange-500 text-orange-900 hover:bg-orange-200">
                  Raporla
                </ErrorModal.Button>
              </div>
            </div>
          </ErrorModal.Panel>
        </ErrorModal>
      )}
      <Dialog as="div" open={open} onClose={onClose} className="relative z-10 min-w-screen">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel as="div" className="bg-white p-6 rounded-lg flex flex-col gap-8 justify-between">
              <div className="flex flex-col gap-2">
                <Dialog.Title as="h3" className="text-xl font-semibold tracking-tight">
                  Yeni bir proje yarat
                </Dialog.Title>
                <Dialog.Description as="span" className="text-slate-600">
                  Bir proje oluşturun ve bu projeyi paylaşmak istediğiniz kişileri ekleyin.
                </Dialog.Description>
                <hr className="h-[2px] rounded-full bg-slate-600/30" />
              </div>
              <form action="" className="flex flex-col gap-6" onSubmit={handleSubmit} autoComplete="off">
                <div className="flex flex-col gap-2">
                  <label className={clsx('tracking-tight font-medium', errors.name && touched.name ? 'text-red-500' : '')}>Proje adı</label>
                  <input
                    className={clsx(
                      'p-2 bg-slate-100 rounded-md outline-none text-sm',
                      errors.name && touched.name ? 'ring-1 ring-red-500 text-red-500' : ''
                    )}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Lütfen proje adını girin"
                    id="name"
                    name="name"
                  />
                  {errors.name && touched.name && <p className="text-sm text-red-500">Lütfen bir proje adı girin</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={clsx('tracking-tight font-medium', errors.description && touched.description ? 'text-red-500' : '')}>
                    Açıklama
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
                    placeholder="Proje açıklaması girin"
                    id="description"
                    name="description"
                  />
                  {errors.description && touched.description && <p className="text-sm text-red-500">Lütfen bir açıklama girin.</p>}
                </div>
                <div>
                  <CreateNewSpacePeopleSearchbar onPeopleListChange={handlePeopleListChange} />
                </div>

                <div className="flex justify-end items-center mt-2 gap-2">
                  <button
                    className="outline-none py-1 px-2 hover:bg-red-400 text-gray-500 hover:text-white rounded-md cursor-pointer"
                    onClick={onClose}
                  >
                    İptal et
                  </button>
                  <button
                    type="submit"
                    disabled={isAnyErrors}
                    className={clsx('rounded-md py-1 px-2', isAnyErrors ? 'bg-blue-200 text-slate-500' : 'bg-blue-500 text-white hover:bg-blue-600')}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Ekle
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default CreateNewSpaceModal;
