import clsx from 'clsx';
import { FaAngleDown } from 'react-icons/fa';
import { Disclosure } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function SearchResultsFilters() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start w-full box-border">
      <button className="shadowhover:shadow">
        <div
          className={clsx(
            'ouline-none focus:outline-none flex lg:p-4 items-center justify-start p-2 gap-2 bg-white cursor-pointer rounded-md',
            open && 'bg-slate-100'
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-md font-semibold text-slate-700">Filters</span>
          <div className={clsx('transition-all duration-100 ease-in', open ? 'rotate-180' : 'rotate-0')}>
            <FaAngleDown />
          </div>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className="overflow-hidden w-full lg:w-96 gap-2 p-2 mt-2 box-border flex flex-col bg-white rounded-md"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.2, type: 'spring' }}
            exit={{ height: 0, transition: { duration: 0.2, type: 'linear' } }}
          >
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
            <span>Filter</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    /*
    <AnimatePresence>
            <Disclosure.Panel
              as={motion.div}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100%' }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
            >
              <h1>Filter</h1>
              <h1>Filter</h1>
              <h1>Filter</h1>
              <h1>Filter</h1>
            </Disclosure.Panel>
          </AnimatePresence>
    <div className="flex flex-col items-start overflow-hidden">
      <div
        className={clsx(
          'ouline-none focus:outline-none flex items-center justify-start p-2 gap-2 bg-white cursor-pointer rounded-md',
          open && 'bg-slate-100'
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-md font-semibold text-slate-700">Filters</span>
        <div className={clsx('transition-all duration-100 ease-in', open ? 'rotate-180' : 'rotate-0')}>
          <FaAngleDown />
        </div>
      </div>
      <div>
        <h1 className={clsx('transition-all duration-300 ease-in', open ? 'min-h-full' : 'max-h-0')}>Filters</h1>
      </div>
    </div>
    */
  );
}

export default SearchResultsFilters;
