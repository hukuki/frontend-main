import React, { useRef, useState, useEffect } from 'react';

import styles from './DashboardPage.module.css';
import { Avatar } from '@chakra-ui/react';
import useAuthContext from '../../context/AuthContextProvider';
import { SpaceCard } from '../../components/common/space-card/SpaceCard';
import { SkeletonSpaceCard } from '../../components/common/skeleton-space-card/SkeletonSpaceCard';
import { CreateSpaceCard } from '../../components/common/create-space-card';
import { motion } from 'framer-motion';
import { SearchBar } from '../../components/common/search-bar';
import DashboardSearchbar from '../../components/common/dashboard-searchbar/DashboardSearchbar';
import DashboardSpacesContainer from '../../components/common/dashboard-spaces-container/DashboardSpacesContainer';

function DashboardPage() {
  const { user } = useAuthContext();
  const inputRef = useRef(null);
  const [activeLink, setActiveLink] = useState('spaces');
  const [loading, setLoading] = useState(true);
  const [allSpaces, setAllSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);

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
        setAllSpaces(data);
        setFilteredSpaces(data);
      }
    }
    if (user) {
      fetchSpaces();
    }
  }, [user]);

  useEffect(() => {
    if (activeLink === 'spaces') {
      console.log(allSpaces);
      setFilteredSpaces(allSpaces);
    }
  }, [activeLink]);

  const handleSearchTermChange = (term) => {
    if (term == '') {
      setFilteredSpaces(allSpaces);
    } else {
      const filtered = allSpaces.filter((space) => space.name.toLowerCase().includes(term));
      setFilteredSpaces(filtered);
    }
  };

  const changeActiveLink = (name) => {
    switch (name) {
      case 'spaces':
        setActiveLink('spaces');
        break;
      case 'people':
        setActiveLink('people');
        break;
      case 'shared_spaces':
        setActiveLink('shared_spaces');
        break;
      case 'saved':
        setActiveLink('saved');
        break;
    }
  };

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
              <button
                onClick={() => changeActiveLink('spaces')}
                className={`${styles.spaces_sidebar_button} ${activeLink === 'spaces' && styles.active}`}
              >
                Projeler
              </button>
              <button onClick={() => changeActiveLink('people')} className={`${styles.people_button} ${activeLink === 'people' && styles.active}`}>
                Kişiler
              </button>
              <button
                onClick={() => changeActiveLink('shared_spaces')}
                className={`${styles.shared_spaces_button} ${activeLink === 'shared_spaces' && styles.active}`}
              >
                Paylaşılanlar
              </button>
              <button
                onClick={() => changeActiveLink('saved')}
                className={`${styles.saved_documents_button} ${activeLink === 'saved' && styles.active}`}
              >
                Kaydedilenler
              </button>
            </div>
            <div className={styles.footer}>&copy; 2023. All rights reserved.</div>
          </div>
          {activeLink === 'spaces' && (
            <div className={styles.spaces__container}>
              <DashboardSpacesContainer
                loading={loading}
                spaces={filteredSpaces}
                onSubmit={handleSearchTermChange}
                onSearchTermChanged={handleSearchTermChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
