import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function AlertModal({ isOpen, close, title, description, children, ...props }) {
  return (
    <Dialog as="div" open={isOpen} onClose={close}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow transition-all">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="mt-4">{children}</div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default AlertModal;
