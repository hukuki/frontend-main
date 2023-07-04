import { useState } from 'react';

import { useRouter } from 'next/router';

// Components
import Searchbar from '../../components/Searchbar';

// CSS
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const router = useRouter();
  const [searchAlgo, setSearchAlgo] = useState('ai');

  const handleSubmit = (query) => {
    router.push(`/search-results?search=${query}&model=${searchAlgo}`);
  };

  return (
    <Searchbar />
    /*
    <>
      <div className={styles.navbar_searchbar__container}>
        <div className={styles.navbar__container}></div>
        <div className={styles.container}>
          <div className={styles['logo__container']}>
            <h1 className={styles.logo}>deeplex</h1>
          </div>
          <div className={styles['searchbar__container']}>
            <Searchbar onSubmit={handleSubmit} />
          </div>
          <div className={styles['search-algos__container']}>
            <div className={styles['ai_button__container']}>
              <button className={styles['ai_button']} onClick={() => setSearchAlgo('ai')}>
                Gelişmiş / AI
              </button>
              {searchAlgo === 'ai' && <div className={styles['ai_button_checked']}></div>}
            </div>
            <div className={styles['bm25_button__container']}>
              <button className={styles['bm25_button']} onClick={() => setSearchAlgo('bm25')}>
                Klasik
              </button>
              {searchAlgo === 'bm25' && <div className={styles['bm25_button_checked']}></div>}
            </div>
          </div>
      </div>
    </>
    */
  );
};

export default SearchPage;
