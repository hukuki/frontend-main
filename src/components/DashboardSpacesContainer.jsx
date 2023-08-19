import React, { useEffect, useState, useMemo } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import DashboardSpacesSearchbar from './DashboardSpacesSearchbar';
import DashboardSpaceCard from './DashboardSpaceCard';
import DashboardSpaceDetail from './DashboardSpaceDetail';
import CreateNewSpaceCard from './CreateNewSpaceCard';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import useSpaceStore from '../store/spaceStore';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, // this will set a delay before the children start animating
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

const detailedSpaceVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
};

const spacesContainerVariants = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

function DashboardSpacesContainer({ onSpaceClick, searchedSpace }) {
  const { user } = useAuthContext();
  const spaces = useSpaceStore((state) => state.spaces);
  const setSpaces = useSpaceStore((state) => state.setSpaces);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [detailedSpace, setDetailedSpace] = useState(null);

  async function getSpaces() {
    const response = await fetch('/api/get_spaces', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: user.accessToken,
      }),
    });
    const { error, data } = await response.json();
    if (!error) {
      setSpaces(data);
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
        // Take a look at this Array.from to refactor
        setFilteredSpaces(Array.from(spaces.values()));
      } else {
        let searchedSpaces = Array.from(spaces.values()).filter((space) => {
          if (space.name.toLowerCase().includes(filterTerm.toLowerCase())) {
            return true;
          }
        });
        setFilteredSpaces(searchedSpaces);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [filterTerm, spaces]);

  const handleSearchTermChange = (term) => {
    setFilterTerm(term);
  };

  return (
    <AnimatePresence>
      {detailedSpace !== null ? (
        <motion.div key="detailed_space" variants={detailedSpaceVariants} initial="initial" animate="animate" exit="exit">
          <DashboardSpaceDetail space={detailedSpace} onBackClick={() => setDetailedSpace(null)} />
        </motion.div>
      ) : (
        <motion.div key="spaces_container" variants={spacesContainerVariants} exit="exit" animate="animate" initial="initial">
          <div>
            <DashboardSpacesSearchbar key="searchbar" onSubmit={handleSearchTermChange} onSearchChange={handleSearchTermChange} />
          </div>

          <motion.div
            layout="position"
            viewport={{ once: true }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 grid-flow-row gap-4 justify-between items-center"
          >
            <CreateNewSpaceCard key="create" />

            {filteredSpaces.length > 0 &&
              filteredSpaces.map((space, index) => {
                return (
                  <motion.div key={space._id} viewport={{ once: true }} variants={itemVariants} onClick={() => setDetailedSpace(space)}>
                    <DashboardSpaceCard space={space} />
                  </motion.div>
                );
              })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DashboardSpacesContainer;
