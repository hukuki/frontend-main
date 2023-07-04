import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import clsx from 'clsx';

function Searchbar({ initialSearch = '', onSubmit, onSearchChange, className, ...props }) {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  return (
    <div className={clsx('min-w-screen flex items-center justify-center', className)}>
      <div
        className={clsx(
          'flex items-center justify-start gap-6 box-border mx-6 p-4 w-full md:max-w-4xl bg-slate-100 rounded-2xl transition',
          focus ? 'shadow-none' : 'shadow-xl'
        )}
      >
        <SearchIcon className="text-md md:text-xl" />
        <input
          className="bg-transparent w-full text-md md:text-xl focus:outline-none"
          value={search}
          onChange={(e) => {
            if (onSearchChange) {
              onSearchChange(e.target.value);
            }
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(search);
            }
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={!initialSearch && 'Search in documents'}
        />
      </div>
    </div>
  );
}

export default Searchbar;
