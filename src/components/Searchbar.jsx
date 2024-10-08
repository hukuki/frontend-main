import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import clsx from 'clsx';

function Searchbar({ initialSearch = '', onSubmit, onSearchChange, className, ...props }) {
  const [search, setSearch] = useState(initialSearch);
  return (
    <div className={clsx('min-w-full flex items-center justify-center', className)}>
      <div
        className={clsx(
          'flex items-center justify-start gap-6 box-border p-4 w-full md:max-w-4xl bg-slate-50 rounded-2xl shadow transition duration-1000'
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
          placeholder={!initialSearch && 'Eve izinsiz girmenin cezası nedir?'}
        />
      </div>
    </div>
  );
}

export default Searchbar;
