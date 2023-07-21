import React, { useEffect, useState, useMemo } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import DashboardSpacesSearchbar from './DashboardSpacesSearchbar';
import DashboardSpaceCard from './DashboardSpaceCard';
import DashboardSpaceDetail from './DashboardSpaceDetail';
import CreateNewSpaceCard from './CreateNewSpaceCard';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0, // this will set a delay before the children start animating
      staggerChildren: 0.08, // this will set the time inbetween children animation
    },
  },
};

const itemVariants = {
  hidden: {
    y: '100vh',
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0,
    },
  },
};

function DashboardSpacesContainer({ onSpaceClick, searchedSpace }) {
  const { user } = useAuthContext();
  const [allSpaces, setAllSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailedSpaceId, setDetailedSpaceId] = useState(null);

  async function getSpaces() {
    const response = await fetch('/api/get_spaces', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: user.accessToken,
      }),
    });
    const { error, data } = await response.json();
    if (!error) {
      setAllSpaces(data);
      console.log(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      getSpaces();
    }
  }, [user]);

  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterTerm === '') {
        setFilteredSpaces(allSpaces);
      } else {
        let searchedSpaces = allSpaces.filter((space) => {
          if (space.name.toLowerCase().includes(filterTerm.toLowerCase())) {
            return true;
          }
        });
        setFilteredSpaces(searchedSpaces);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [filterTerm, allSpaces]);

  const handleSearchTermChange = (term) => {
    setFilterTerm(term);
  };

  const handleNewSpaceCreated = async () => {
    await getSpaces();
  };

  if (detailedSpaceId !== null) {
    return <DashboardSpaceDetail spaceId={detailedSpaceId} onBackClick={() => setDetailedSpaceId(null)} />;
  } else {
    return (
      <LayoutGroup layout>
        <div>
          <DashboardSpacesSearchbar onSubmit={handleSearchTermChange} onSearchChange={handleSearchTermChange} />
        </div>

        <motion.div
          layout="position"
          viewport={{ once: true }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 grid-flow-row gap-4 justify-between items-center"
        >
          <CreateNewSpaceCard onSubmit={handleNewSpaceCreated} />

          {filteredSpaces.length > 0 &&
            filteredSpaces.map((space, index) => {
              return (
                <motion.div key={space._id} viewport={{ once: true }} variants={itemVariants} onClick={() => setDetailedSpaceId(space._id)}>
                  <DashboardSpaceCard space={space} />
                </motion.div>
              );
            })}
        </motion.div>
      </LayoutGroup>
    );
  }

  /*
  if (detailedSpaceId) {
    return <DashboardSpaceDetail callback={callback} spaceId={detailedSpaceId} onBackClick={() => setDetailedSpaceId(null)} />;
  } else {
    return (
      <>
        <div className={styles.spaces_search_button__container}>
          <DashboardSearchbar onSubmit={handleSearchTermChange} onSearchTermChanged={handleSearchTermChange} />
        </div>
        <div className={styles.space_cards_container}>
          <CreateSpaceCard onSubmit={handleNewSpaceCreated} />
          {loading ? (
            <>
              {new Array(20).fill({}).map((item) => {
                return <SkeletonSpaceCard />;
              })}
            </>
          ) : (
            <>
              {filteredSpaces.length > 0 &&
                filteredSpaces.map((space, index) => {
                  return (
                    <motion.div
                      variants={item}
                      whileHover="hover"
                      zIndex={-1}
                      onClick={() => {
                        setDetailedSpaceId(space._id);
                      }}
                    >
                      <SpaceCard
                        reveal={{
                          duration: 500,
                          delay: 350,
                          reset: true,
                        }}
                        key={index}
                        space={space}
                      />
                    </motion.div>
                  );
                })}
            </>
          )}
        </div>
      </>
    );
  }
  */
}

export default DashboardSpacesContainer;
