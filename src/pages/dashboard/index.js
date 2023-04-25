import React, { useRef, useState, useEffect } from 'react';

import styles from './DashboardPage.module.css';
import { FaPlus } from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box, SkeletonCircle, SkeletonText, Flex } from '@chakra-ui/react';
import useAuthContext from '../../context/AuthContextProvider';
import { SpaceCard } from '../../components/common/space-card/SpaceCard';
import { SkeletonSpaceCard } from '../../components/common/skeleton-space-card/SkeletonSpaceCard';
import { motion } from 'framer-motion';

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

/* MOCK DATA */
/*

    new Array(100).fill({
      name: 'Client 1',
      description: 'Merge and Acquisition',
      contacts: [
        {
          name: 'Lorem Ipsum',
          photoURL: 'https://bit.ly/ryan-florence',
        },
        {
          name: 'Lorem Ipsum',
          photoURL: 'https://bit.ly/ryan-florence',
        },
        {
          name: 'Lorem Ipsum',
          photoURL: 'https://bit.ly/ryan-florence',
        },
      ],
    })

    */

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

  return (
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
          </div>
          <div className={styles.footer}>&copy; 2023. All rights reserved.</div>
        </div>
        <div className={styles.spaces__container}>
          <div className={styles.spaces_search_button__container}>
            <button className={styles.spaces_search_icon}>
              <SearchIcon />
            </button>
            <input className={styles.spaces_search_input} placeholder="Ara" ref={inputRef} />
          </div>
          <div className={styles.space_cards_container}>
            <motion.div className={styles.new_space_card} variants={item} whileHover="hover" zIndex={-1}>
              <FaPlus />
              <span className={styles.new_space_card_parag}>Yeni bir proje yarat</span>
            </motion.div>
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
  );
}

export default DashboardPage;
