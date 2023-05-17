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

const SearchResultsPage = ({ data }) => {
  const [results, setResulsts] = useState(new Array(10).fill({}));
  const [loading, setLoading] = useState(true);
  const [addToSpaceDocumentId, setAddToSpaceDocumentId] = useState(null);
  const [isAddToSpaceModalOpen, setIsAddToSpaceModalOpen] = useState(false);

  useEffect(() => {
    setResulsts(data.documents);
    setLoading(false);
  }, [data]);

  const [mevzuatFilters, setMevzuatFilters] = useState({
    kanun_khk: true,
    teblig: true,
    yonetmelik: true,
  });

  const [validFilters, setValidFilters] = useState({
    mulga: true,
    yururluk: true,
    yonetmelik: true,
  });

  const [organizationName, setOrganizationName] = useState('');

  const [mevzuatSearchInput, setMevzuatSearchInput] = useState({
    mevzuat: '',
    madde: '',
  });

  const [dateFilters, setDateFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/document/${id}`);
  };

  const handleSearchSubmit = (query) => {
    router.push(`/search-results?search=${query}`);
  };

  const handleOrganizationSearch = () => {};
  const handleMevzuatSearch = () => {};
  const handleDateSearch = () => {};

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
              <div className={styles['filters__valid-container']}>
                <p className={styles['filters__valid-title']}>Yürürlülük Durumu</p>
                <div className={styles['filters__valid-checkbox-group']}>
                  <FilterCheckbox
                    label="Mülga"
                    isChecked={true}
                    onChecked={() =>
                      setValidFilters((prev) => {
                        return {
                          ...prev,
                          mulga: !prev.mulga,
                        };
                      })
                    }
                  />
                  <FilterCheckbox
                    label="Yürürlülükte"
                    isChecked={true}
                    onChecked={() =>
                      setValidFilters((prev) => {
                        return {
                          ...prev,
                          yururluk: !prev.yururluk,
                        };
                      })
                    }
                  />
                  <FilterCheckbox
                    label="Yönetmelik"
                    isChecked={true}
                    onChecked={() =>
                      setValidFilters((prev) => {
                        return {
                          ...prev,
                          yonetmelik: !prev.yonetmelik,
                        };
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles['filters__organization-container']}>
                <p className={styles['filters__organization-title']}>Kuruma Göre</p>
                <div className={styles['filters__organization-input-button-container']}>
                  <FilterInput
                    className={styles['filters__organization-input']}
                    placeholder="Kurum Adı"
                    type="text"
                    onSubmit={handleOrganizationSearch}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    value={organizationName}
                  />
                </div>
              </div>
              <div className={styles['filters__mevzuat-container']}>
                <p className={styles['filters__mevzuat-title']}>Mevzuata Göre</p>
                <div className={styles['filters__mevzuat-input-button-container']}>
                  <FilterInput
                    className={styles['filters__mevzuat-input']}
                    placeholder="Mevzuat"
                    type="text"
                    onChange={(e) =>
                      setMevzuatSearchInput((prev) => {
                        return {
                          ...prev,
                          mevzuat: e.target.value,
                        };
                      })
                    }
                    value={mevzuatSearchInput.mevzuat}
                  />
                  <FilterInput
                    className={styles['filters__mevzuat-madde-input']}
                    placeholder="Madde"
                    type="number"
                    onChange={(e) =>
                      setMevzuatSearchInput((prev) => {
                        return {
                          ...prev,
                          madde: e.target.value,
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
                    type="date"
                    onChange={(e) =>
                      setDateFilters((prev) => {
                        return {
                          ...prev,
                          startDate: e.target.value,
                        };
                      })
                    }
                    value={dateFilters.startDate}
                  />
                  <FilterInput
                    className={styles['filters__date-input']}
                    placeholder="Bitiş"
                    type="date"
                    onChange={(e) =>
                      setDateFilters((prev) => {
                        return {
                          ...prev,
                          endDate: e.target.value,
                        };
                      })
                    }
                    value={dateFilters.endDate}
                  />
                </div>
              </div>
              <button className={styles['overall__search-button']}>Ara</button>
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
              <SearchBar onSubmit={handleSearchSubmit} colorMode="light" />
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
                          setAddToSpaceDocumentId(result.id);
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
  const search = context.query.search.split('%20').join(' ');
  const body = { query: search };

  try {
    const res = await fetch(`${backend_url}/query`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return {
      props: { data },
    };
  } catch (err) {
    console.log(err);
    return { props: { data: new Array(10).fill({}) } };
  }
}

export default SearchResultsPage;
