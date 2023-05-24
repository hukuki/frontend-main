import { useState, useEffect, useRef } from 'react';

// CSS
import styles from './SearchResultsPage.module.css';
import { SkeletonText, Box, Progress, Button } from '@chakra-ui/react';
import { SearchBar } from '../../components/common/search-bar';
import { SearchResultCard } from '../../components/common/search-result-card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FilterInput } from '../../components/common/filter-input';
import { FilterCheckbox } from '../../components/common/filter-checkbox';
import AddToSpaceModal from '../../components/common/add-to-space-modal/AddToSpaceModal';

const item = {
  hover: {
    scale: 1.015,
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

const SearchResultsPage = ({ data, query, algo }) => {
  const [results, setResulsts] = useState(new Array(10).fill({}));
  const [loading, setLoading] = useState(true);
  const [addToSpaceDocumentId, setAddToSpaceDocumentId] = useState(null);
  const [isAddToSpaceModalOpen, setIsAddToSpaceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchAlgo, setSearchAlgo] = useState(algo);

  useEffect(() => {
    console.log(data);
    console.log(query);
    setResulsts(data.documents);
    setLoading(false);
  }, [data]);

  const [mevzuatFilters, setMevzuatFilters] = useState({
    kanun_khk: true,
    teblig: true,
    yonetmelik: true,
  });

  const [mevzuatSearchInput, setMevzuatSearchInput] = useState({
    mevzuatNo: '',
  });

  const [mevzuatYearFilters, setMevzuatYearFilters] = useState({
    startYear: '0',
    endYear: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/document/${id}`);
  };

  const handleSearchSubmit = (query) => {
    console.log(query);
    router.push(`/search-results?search=${query}`);
  };

  const handleFilteredSearch = () => {
    let filters = '';
    let mevzuatTurs = [];
    if (mevzuatFilters.kanun_khk) {
      mevzuatTurs = [...mevzuatTurs, 1];
    }
    if (mevzuatFilters.teblig) {
      mevzuatTurs = [...mevzuatTurs, 9];
    }
    if (mevzuatFilters.yonetmelik) {
      mevzuatTurs = [...mevzuatTurs, 7];
    }
    if (mevzuatTurs.length > 0) {
      filters = filters + `&mevzuatTurs=${mevzuatTurs.join(' ')}`;
    }
    if (mevzuatSearchInput.mevzuatNo) {
      filters = filters + `&mevzuatNo=${mevzuatSearchInput.mevzuatNo}`;
    }
    filters = filters + `&mevzuatStartYear=${mevzuatYearFilters.startYear}&mevzuatEndYear=${mevzuatYearFilters.endYear}`;
    console.log(query);
    router.push(`/search-results?search=${query}${filters}`);
  };

  return (
    <>
      {isAddToSpaceModalOpen && <AddToSpaceModal documentId={addToSpaceDocumentId} setIsOpen={setIsAddToSpaceModalOpen} />}
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
                  <FilterCheckbox
                    label="Kanun / KHK"
                    isChecked={true}
                    onChecked={() =>
                      setMevzuatFilters((prev) => {
                        return {
                          ...prev,
                          kanun_khk: !prev.kanun_khk,
                        };
                      })
                    }
                  />
                  <FilterCheckbox
                    label="Tebliğ"
                    isChecked={true}
                    onChecked={() =>
                      setMevzuatFilters((prev) => {
                        return {
                          ...prev,
                          teblig: !prev.teblig,
                        };
                      })
                    }
                  />
                  <FilterCheckbox
                    label="Yönetmelik"
                    isChecked={true}
                    onChecked={() =>
                      setMevzuatFilters((prev) => {
                        return {
                          ...prev,
                          yonetmelik: !prev.yonetmelik,
                        };
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles['filters__mevzuat-container']}>
                <p className={styles['filters__mevzuat-title']}>Mevzuata Göre</p>
                <div className={styles['filters__mevzuat-input-button-container']}>
                  <FilterInput
                    className={styles['filters__mevzuat-madde-input']}
                    placeholder="Mevzuat No"
                    type="number"
                    onChange={(e) =>
                      setMevzuatSearchInput((prev) => {
                        return {
                          ...prev,
                          mevzuatNo: e.target.value,
                        };
                      })
                    }
                    value={mevzuatSearchInput.madde}
                  />
                </div>
              </div>
              <div className={styles['filters__date-container']}>
                <p className={styles['filters__date-title']}>Değişiklik Tarihi</p>
                <div className={styles['filters__date-inputs-container']}>
                  <FilterInput
                    className={styles['filters__date-input']}
                    placeholder="Başlangıç"
                    type="number"
                    onChange={(e) =>
                      setMevzuatYearFilters((prev) => {
                        return {
                          ...prev,
                          startYear: e.target.value,
                        };
                      })
                    }
                    value={mevzuatYearFilters.startYear}
                  />
                  <FilterInput
                    className={styles['filters__date-input']}
                    placeholder="Bitiş"
                    type="number"
                    onChange={(e) =>
                      setMevzuatYearFilters((prev) => {
                        return {
                          ...prev,
                          endYear: e.target.value,
                        };
                      })
                    }
                    value={mevzuatYearFilters.endYear}
                  />
                </div>
              </div>
              <button className={styles['overall__search-button']} onClick={handleFilteredSearch}>
                Ara
              </button>
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
              <div className={styles['searchbar_options__container']}>
                <div className={styles['searchbar_component__container']}>
                  <SearchBar onSearchChange={setSearchQuery} initialSearch={query} onSubmit={handleSearchSubmit} colorMode="light" />
                </div>
                <div className={styles['searchbar_algos__container']}>
                  <div className={styles['ai_button__container']}>
                    <button className={styles['ai_button']}>Gelişmiş / AI</button>
                    {searchAlgo === 'ai' && <div className={styles['ai_checked']}></div>}
                  </div>
                  <div className={styles['bm25_button__container']}>
                    <button className={styles['bm25_button']}>Klasik</button>
                    {searchAlgo === 'bm25' && <div className={styles['bm25_checked']}></div>}
                  </div>
                </div>
              </div>
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
                  <h1 className={styles['results__title']}>{`Sonuçlar (${results?.length})`}</h1>
                  <div className={styles['results__sort']}>
                    <p className={styles['results__sort-type']}>İlgiye Göre</p>
                    <ChevronDownIcon boxSize={6} w={8} h={8} />
                  </div>
                </div>
                {results?.map((result, index) => {
                  return (
                    <motion.div
                      onClick={() => handleCardClick(result.meta.doc_id)}
                      variants={item}
                      whileHover="hover"
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
                        onAddToSpace={() => {
                          setAddToSpaceDocumentId(result.meta.doc_id);
                          setIsAddToSpaceModalOpen(true);
                        }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const backend_url = process.env.BACKEND_URL;
  const search = context.query.search && context.query.search.split('%20').join(' ');
  const algo = context.query.model ? context.query.model : 'ai';
  const mevzuatTurs = context.query.mevzuatTurs && context.query.mevzuatTurs.split(' ').map((t) => Number(t));
  const mevzuatNo = context.query.mevzuatNo && context.query.mevzuatNo;
  const mevzuatStartYear = context.query.mevzuatStartYear && context.query.mevzuatStartYear;
  const mevzuatEndYear = context.query.mevzuatEndYear && context.query.mevzuatEndYear;
  const params = {};
  if (mevzuatTurs) {
    params.filters.$and.mevzuatTur = { $in: [...mevzuatTurs] };
  }
  if (mevzuatNo) {
    params.filters.$and.mevzuatNo = { $eq: mevzuatNo };
  }
  if (mevzuatStartYear) {
    params.filters.$and.resmiGazeteTarihiYil = { $gte: mevzuatStartYear };
  }
  if (mevzuatEndYear) {
    params.filters.$and.resmiGazeteTarihiYil = { ...params.filters.$and.resmiGazeteTarihiYil, $lte: mevzuatEndYear };
  }
  const body = { query: search, params };
  console.log(JSON.stringify(body));
  try {
    const res = await fetch(`${backend_url}/query?model=${algo}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return {
      props: { data, query: search, algo },
    };
  } catch (err) {
    console.log(err);
    return { props: { data: new Array(10).fill({}), query: search, algo } };
  }
}

export default SearchResultsPage;
