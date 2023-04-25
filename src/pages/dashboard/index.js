import React, { useRef, useState } from 'react';

import styles from './DashboardPage.module.css';
import { FaPlus } from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/react';
import useAuthContext from '../../context/AuthContextProvider';
import { SpaceCard } from '../../components/common/space-card/SpaceCard';
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

function DashboardPage() {
  const { user } = useAuthContext();
  const inputRef = useRef(null);
  const [activeLink, setActiveLink] = useState('spaces');
  const [spaces, setSpaces] = useState(
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
  );
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
