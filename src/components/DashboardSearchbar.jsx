import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

function DashboardSearchbar({ initialSearch, placeholder, onSubmit, onSearchTermChanged }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchTermChanged(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    onSearchTermChanged('');
  }, []);

  return (
    <div className="min-w-full flex justify-center items-center">
      <div className="flex items-center justify-start gap-4 box-border w-full bg-slate-50 rounded-md p-2 shadow">
        <FaSearch className="text-md" />
        <input
          className="bg-transparent w-full text-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => {
            if (onSearchTermChanged) {
              onSearchTermChanged(e.target.value);
            }
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(searchTerm);
            }
          }}
          placeholder={placeholder || 'Search'}
        />
      </div>
    </div>
    /*
    <motion.div className={styles.container}>
      <form
        className={styles.form__container}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(searchTerm);
        }}
        action=""
      >
        <div className={styles.input__container}>
          <button tyope="submit" className={styles.search_button}>
            <SearchIcon className={styles.search_icon} />
          </button>
          <input
            className={styles.input}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Projeler arasında arayın"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSubmit(searchTerm);
              }
            }}
          />
        </div>
      </form>
    </motion.div>
    */
  );
}

export default DashboardSearchbar;
