import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './DashboardSearchbar.module.css';
import { SearchIcon } from '@chakra-ui/icons';

function DashboardSearchbar({ onSubmit, onSearchTermChanged }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchTermChanged(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
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
  );
}

export default DashboardSearchbar;
