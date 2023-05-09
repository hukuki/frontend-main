import React, { useRef, useState, useEffect } from 'react';

import styles from './DashboardPage.module.css';
import { Avatar } from '@chakra-ui/react';
import useAuthContext from '../../context/AuthContextProvider';
import { SpaceCard } from '../../components/common/space-card/SpaceCard';
import { SkeletonSpaceCard } from '../../components/common/skeleton-space-card/SkeletonSpaceCard';
import { CreateSpaceCard } from '../../components/common/create-space-card';
import { motion } from 'framer-motion';
import { SearchBar } from '../../components/common/search-bar';

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

function DashboardPage() {
  const { user } = useAuthContext();
  const inputRef = useRef(null);
  const [activeLink, setActiveLink] = useState('spaces');
  const [loading, setLoading] = useState(true);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    async function fetchSpaces() {
      const response = await fetch(`/api/get_spaces`, {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await response.json();
      console.log(error);
      console.log(data);
      if (!error) {
        setLoading(false);
        setSpaces(data);
      }
    }
    if (user) {
      fetchSpaces();
      console.log(spaces);
    }
  }, [user]);

  const handleSpaceSearch = () => {};
  const handleSubmit = () => {};

  return (
    <>
      <div className={styles.page__container}>
        <div className={styles.container}>
          <div className={styles.sidebar__container}>
            {user && (
              <div className={styles.avatar__container}>
                <Avatar size="2xl" src={user.photoURL} />
                <span className={styles.user_name}>{user.displayName}</span>
                <span className={styles.user_email}>{user.email}</span>
              </div>
            )}
            <div className={styles.links__container}>
              <button className={`${styles.spaces_sidebar_button} ${activeLink === 'spaces' && styles.active}`}>Projeler</button>
              <button className={styles.people_button}>Kişiler</button>
              <button className={styles.shared_spaces_button}>Paylaşılanlar</button>
              <button className={styles.saved_documents_button}>Kaydedilenler</button>
            </div>
            <div className={styles.footer}>&copy; 2023. All rights reserved.</div>
          </div>
          <div className={styles.spaces__container}>
            <div className={styles.spaces_search_button__container}>
              <SearchBar onSubmit={handleSpaceSearch} />
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
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
