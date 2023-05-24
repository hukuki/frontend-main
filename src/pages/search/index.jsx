import { useState } from 'react';

import { useRouter } from 'next/router';

// Components
import { SearchBar } from '@/components/common/search-bar';

// CSS
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const router = useRouter();
  const [searchAlgo, setSearchAlgo] = useState('ai');

  const handleSubmit = (query) => {
    router.push(`/search-results?search=${query}&model=${searchAlgo}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles['logo__container']}>
          <h1 className={styles.logo}>deeplex</h1>
        </div>
        <div className={styles['searchbar__container']}>
          <SearchBar onSubmit={handleSubmit} />
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
      {/*
    <Flex height="100%" align="center" direction="column" justify="center" gap="10px" paddingBottom="100px">
      <Icon as={GoLaw} color="dark.quinary" fontSize={200} />
      <Box w="50%" minW="500px" maxW="750px">
        <SearchBar onSubmit={(search, category) => router.push(`/search-results?category=${category}&search=${search}`)} />
      </Box>
    </Flex>
    */}
    </>
  );
};

export default SearchPage;
