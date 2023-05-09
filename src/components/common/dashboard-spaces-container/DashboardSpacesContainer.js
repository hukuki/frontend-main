import React, { useEffect } from 'react';
import DashboardSearchbar from '../dashboard-searchbar/DashboardSearchbar';
import { CreateSpaceCard } from '../create-space-card/CreateSpaceCard';
import { SkeletonSpaceCard } from '../skeleton-space-card/SkeletonSpaceCard';
import { SpaceCard } from '../space-card/SpaceCard';
import { motion } from 'framer-motion';
import styles from './DashboardSpacesContainer.module.css';

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

function DashboardSpacesContainer({ spaces, onSubmit, onSearchTermChanged, loading }) {
  useEffect(() => {
    console.log(spaces);
  });
  return (
    <>
      <div className={styles.spaces_search_button__container}>
        <DashboardSearchbar onSubmit={onSubmit} onSearchTermChanged={onSearchTermChanged} />
      </div>
      <div className={styles.space_cards_container}>
        <CreateSpaceCard />
        {loading ? (
          <>
            {new Array(20).fill({}).map((item) => {
              return <SkeletonSpaceCard />;
            })}
          </>
        ) : (
          <>
            {spaces.map((space, index) => {
              return (
                <motion.div variants={item} whileHover="hover" zIndex={-1}>
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

export default DashboardSpacesContainer;
