import { useState, useEffect, useRef, Fragment } from 'react';

import SearchResultsSearchbar from '../../components/SearchResultsSearchbar';
import SearchResultsNavbar from '../../components/SearchResultsNavbar';
import SearchResultsFilters from '../../components/SearchResultsFilters';
import SearchResultCard from '../../components/SearchResultCard';
import { useRouter } from 'next/router';
import { FaAngleDown } from 'react-icons/fa';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import clsx from 'clsx';
import useAuthContext from '../../context/AuthContextProvider';
import fakeResults from './fake_results';

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0, // this will set a delay before the children start animating
      staggerChildren: 0.3, // this will set the time inbetween children animation
    },
  },
};
export const dropUpVariants = {
  hidden: {
    x: '100vw',
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
    },
  },
};

function SearchMethodsPopover({ onAdvancedClick, onClassicClick, ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-10">
      <button
        className={clsx(
          'ouline-none focus:outline-none flex items-center justify-between p-2 gap-2 hover:bg-slate-100 cursor-pointer rounded-md',
          open && 'bg-slate-100'
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-md font-semibold text-slate-700">Search Methods</span>
        <div className={clsx('transition-all duration-100 ease-in', open ? 'rotate-180' : 'rotate-0')}>
          <FaAngleDown />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="methods"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-5 mt-6 flex origin-top flex-col items-start gap-2 rounded-lg bg-white py-4 px-6 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <button className="group" onAdvancedClick={onAdvancedClick}>
              <span className="advanced_button_animate text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-orange-500 to-purple-900 group-hover:text-blue-500 whitespace-nowrap">
                Advanced / AI
              </span>
            </button>
            <button className="group " onClassicClick={onClassicClick}>
              <span className="group-hover:text-blue-500">Classic</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SearchResultsPage = ({ data, query, algo }) => {
  const [results, setResulsts] = useState(fakeResults);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchAlgo, setSearchAlgo] = useState(algo);
  const { user } = useAuthContext();

  useEffect(() => {
    setResulsts(fakeResults);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    console.log(fakeResults);
  }, []);

  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/document/${id}`);
  };

  const handleSearchSubmit = (query) => {
    router.push(`/search-results?model=${searchAlgo}&search=${query}`);
  };

  return (
    <LayoutGroup layout>
      <div className="flex flex-col max-h-content bg-neutral-200 relative">
        <div>
          <SearchResultsNavbar divClass="md:max-w-4xl" />
        </div>
        <div className="relative flex flex-col-reverse lg:flex-row lg:gap-2 p-2 mx-auto md:mt-4 items-start max-w-4xl">
          <div className="flex flex-col gap-2 md:gap-4 max-w-3xl">
            <div className="flex flex-1 gap-4 items-center justify-center bg-white rounded-lg p-2 sticky top-2 left-0 shadow-md">
              <div className="flex-1">
                <SearchResultsSearchbar onSearchChange={setSearchQuery} initialSearch={query} onSubmit={handleSearchSubmit} />
              </div>
              <div>
                <SearchMethodsPopover onAdvancedClick={() => setSearchAlgo('ai')} onClassicClick={() => setSearchAlgo('bm25')} />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <span className="mb text-slate-500 font-medium">All results {`(${results.length})`}</span>
              {results && (
                <motion.div layout variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
                  {results.map((result, index) => (
                    <motion.div key={index} variants={dropUpVariants}>
                      <SearchResultCard onCardClick={() => handleCardClick(result.meta.doc_id)} document={result} onAddToSpace={() => {}} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <motion.div className="w-full lg:w-12 lg:h- block lg:sticky lg:left-0 lg:top-2 mb-2 box-border">
            <SearchResultsFilters />
          </motion.div>
        </div>
      </div>
    </LayoutGroup>
    /*
    <>
      {isAddToSpaceModalOpen && <AddToSpaceModal documentId={addToSpaceDocumentId} setIsOpen={setIsAddToSpaceModalOpen} />}
      <div className={styles.container}>
        <div className={styles['filters__container']}>
          <div className={styles.navbar__container}>
            <Navbar />
          </div>
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
                <p className={styles['filters__date-title']}>Resmi Gazete Tarihi</p>
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
                    <button className={styles['ai_button']} onClick={() => setSearchAlgo('ai')}>
                      Gelişmiş / AI
                    </button>
                    {searchAlgo === 'ai' && <div className={styles['ai_checked']}></div>}
                  </div>
                  <div className={styles['bm25_button__container']}>
                    <button className={styles['bm25_button']} onClick={() => setSearchAlgo('bm25')}>
                      Klasik
                    </button>
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
    */
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
  const params = { filters: { $and: {} } };
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
  try {
    const res = await fetch(`${backend_url}/query?model=${algo}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
    return {
      props: { data, query: search, algo },
    };
  } catch (err) {
    console.log(err);
    return { props: { data: new Array(10).fill({}), query: search, algo } };
  }
}

export default SearchResultsPage;
