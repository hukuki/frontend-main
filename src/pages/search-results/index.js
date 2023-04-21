import { useState, useEffect, useRef } from 'react';

// CSS
import styles from './SearchResultsPage.module.css';
import SearchResults from '../../mocks/search-results/search.ts';
import { SkeletonText, Box, Progress, Button } from '@chakra-ui/react';
import { SearchBar } from '../../components/common/search-bar';
import { SearchResultCard } from '../../components/common/search-result-card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FilterInput } from '../../components/common/filter-input';
import { FilterCheckbox } from '../../components/common/filter-checkbox';

const item = {
  hover: {
    scale: 1.02,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

const SearchResultsPage = () => {
  const [results, setResulsts] = useState(new Array(10).fill({}));
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setResulsts(SearchResults.documents);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (id) => {
    router.push(`/document/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles['filters__container']}>
        <p className={styles['filters__logo-title']}>deeplex</p>
        {loading ? (
          <div className={styles['filters__skeleton-container']}>
            <Box padding="6">
              <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="8" />
            </Box>
          </div>
        ) : (
          <div className={styles['filter__options-container']}>
            <p className={styles['filters__title']}>Filtrele</p>
            <div className={styles['filters__type-container']}>
              <p className={styles['filters__type-title']}>Mevzuat Türü</p>
              <div className={styles['filters__type-checkbox-group']}>
                <FilterCheckbox label="Kanun / KHK" isChecked={true} />
                <FilterCheckbox label="Tebliğ" isChecked={true} />
                <FilterCheckbox label="Yönetmelik" isChecked={true} />
              </div>
            </div>
            <div className={styles['filters__valid-container']}>
              <p className={styles['filters__valid-title']}>Yürürlülük Durumu</p>
              <div className={styles['filters__type-checkbox-group']}>
                <FilterCheckbox label="Mülga" isChecked={true} />
                <FilterCheckbox label="Yürürlülükte" isChecked={true} />
                <FilterCheckbox label="Yönetmelik" isChecked={true} />
              </div>
            </div>
            <div className={styles['filters__organization-container']}>
              <p className={styles['filters__organization-title']}>Kuruma Göre</p>
              <div className={styles['filters__organization-input-button-container']}>
                <FilterInput className={styles['filters__organization-input']} placeholder="Kurum Adı" type="text" />
                <button className={styles['filters__organization-button']}>Ara</button>
              </div>
            </div>
            <div className={styles['filters__mevzuat-container']}>
              <p className={styles['filters__mevzuat-title']}>Mevzuata Göre</p>
              <div className={styles['filters__mevzuat-input-button-container']}>
                <FilterInput className={styles['filters__mevzuat-input']} placeholder="Mevzuat" type="text" />
                <FilterInput className={styles['filters__mevzuat-madde-input']} placeholder="Madde" type="number" />
                <button className={styles['filters__mevzuat-button']}>Ara</button>
              </div>
            </div>
            <div className={styles['filters__date-container']}>
              <p className={styles['filters__date-title']}>Değişiklik Tarihi</p>
              <div className={styles['filters__date-inputs-container']}>
                <FilterInput className={styles['filters__date-input']} placeholder="Başlangıç" type="date" />
                <FilterInput className={styles['filters__date-input']} placeholder="Bitiş" type="date" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles['results__container']}>
        <div className={styles['searchbar__container']}>
          {loading ? (
            <div className={styles['searchbar__skeleton-container']}>
              <Progress width="100%" isIndeterminate />
            </div>
          ) : (
            <SearchBar colorMode="light" />
          )}
        </div>
        <div className={styles['results__cards-container']}>
          {loading ? (
            <div className={styles['results__cards-skeleton-container']}>
              {results.map((_, index) => {
                return (
                  <Box padding="6" boxShadow="lg">
                    <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="2" />
                  </Box>
                );
              })}
            </div>
          ) : (
            <motion.div>
              <div className={styles['results__title-sort-container']}>
                <h1 className={styles['results__title']}>{`Sonuçlar (${results.length})`}</h1>
                <div className={styles['results__sort']}>
                  <p className={styles['results__sort-type']}>İlgiye Göre</p>
                  <ChevronDownIcon boxSize={6} w={8} h={8} />
                </div>
              </div>
              {results.map((result, index) => {
                return (
                  <motion.div
                    onClick={() => handleCardClick(result.id)}
                    variants={item}
                    whileHover="hover"
                    whileTap="tap"
                    className={styles['result-card__container']}
                    zIndex={-1}
                  >
                    <SearchResultCard
                      reveal={{
                        duration: 500,
                        delay: 350,
                        reset: true,
                      }}
                      key={index}
                      document={result}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
