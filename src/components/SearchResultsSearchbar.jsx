import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import clsx from 'clsx';

function SearchResultsSearchbar({ initialSearch = '', onSubmit, onSearchChange, className, ...props }) {
  const [search, setSearch] = useState(initialSearch);
  return (
    <div className={clsx('min-w-full flex items-center justify-center', className)}>
      <div className={clsx('flex items-center justify-start gap-4 box-border py-2 px-4 w-full bg-slate-50 rounded-lg shadow-inner')}>
        <SearchIcon className="text-sm" />
        <input
          className="bg-transparent w-full text-md focus:outline-none"
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
          placeholder={initialSearch == '' ? 'Search in documents' : initialSearch}
        />
      </div>
    </div>
  );
}

export default SearchResultsSearchbar;
