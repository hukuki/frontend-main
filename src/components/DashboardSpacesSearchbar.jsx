import clsx from 'clsx';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
function DashboardSpacesSearchbar({ divClass = '', onSubmit, onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className={clsx('', divClass ? divClass : 'min-w-full flex items-center justify-center bg-white rounded-md p-2 shadow')}>
      <div className="flex items-center justify-start gap-2 w-full bg-slate-50 rounded-md shadow-inner transition duration-300 p-2">
        <FaSearch className="text-sm md:text-md" />
        <input
          className="bg-transparent w-full text-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => {
            if (onSearchChange) {
              onSearchChange(e.target.value);
            }
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(searchTerm);
            }
          }}
          placeholder="Projelerimde ara"
        />
      </div>
    </div>
  );
}

export default DashboardSpacesSearchbar;
