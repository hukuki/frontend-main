import clsx from 'clsx';
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import CreateNewSpaceModal from './CreateNewSpaceModal';
function CreateNewSpaceCard({ onSubmit, divClass, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CreateNewSpaceModal open={isOpen} onClose={() => setIsOpen(false)} />
      <div
        className={clsx(
          'flex flex-col items-center justify-center gap-2 hover:scale-105 transition duration-100 ease-in cursor-pointer',
          divClass ? divClass : 'bg-gradient-to-t from-blue-800 to-violet-600 rounded-md aspect-square min-w-[10rem] max-w-[16rem]'
        )}
        onClick={() => setIsOpen(true)}
      >
        <FaPlusCircle className="text-4xl text-white" />
        <span className="text-xl text-white">Yeni Proje</span>
      </div>
    </>
  );
}

export default CreateNewSpaceCard;
