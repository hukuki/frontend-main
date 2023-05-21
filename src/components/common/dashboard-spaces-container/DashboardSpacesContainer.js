import React, { useEffect, useState, useMemo } from 'react';
import DashboardSearchbar from '../dashboard-searchbar/DashboardSearchbar';
import { CreateSpaceCard } from '../create-space-card/CreateSpaceCard';
import { SkeletonSpaceCard } from '../skeleton-space-card/SkeletonSpaceCard';
import { SpaceCard } from '../space-card/SpaceCard';
import { motion } from 'framer-motion';
import styles from './DashboardSpacesContainer.module.css';
import useAuthContext from '../../../context/AuthContextProvider';
import { useRouter } from 'next/router';
import DashboardSpaceDetail from '../dashboard-space-detail/DashboardSpaceDetail';

const item = {
  hover: {
    scale: 1.05,
    transition: {
      ease: 'easeIn',
      duration: 0.3,
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

function DashboardSpacesContainer({ onSpaceClick }) {
  const { user } = useAuthContext();
  const [allSpaces, setAllSpaces] = useState([]);
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
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      getSpaces();
    }
  }, [user]);

  const [filterTerm, setFilterTerm] = useState('');

  const filteredSpaces = useMemo(() => {
    if (filterTerm === '') {
      return allSpaces;
    } else {
      return allSpaces.filter((space) => {
        if (space.name.toLowerCase().includes(filterTerm)) {
          return true;
        }
      });
    }
  }, [filterTerm, allSpaces]);

  const handleSearchTermChange = async (term) => {
    setFilterTerm(term);
  };

  const handleNewSpaceCreated = async () => {
    await getSpaces();
  };

  if (detailedSpaceId) {
    return <DashboardSpaceDetail spaceId={detailedSpaceId} onBackClick={() => setDetailedSpaceId(null)} />;
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
              {filteredSpaces.map((space, index) => {
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
}

export default DashboardSpacesContainer;
