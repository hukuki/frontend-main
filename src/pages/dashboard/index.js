import React, { useRef, useState, useEffect } from 'react';

import styles from './DashboardPage.module.css';
import { Avatar } from '@chakra-ui/react';
import useAuthContext from '../../context/AuthContextProvider';
import DashboardSpacesContainer from '../../components/common/dashboard-spaces-container/DashboardSpacesContainer';
import DashboardBookmarksContainer from '../../components/common/dashboard-bookmarks-container/DashboardBookmarksContainer';
import { useRouter } from 'next/router';

function DashboardPage() {
  const { user, signOutWithGoogle } = useAuthContext();
  const [activeLink, setActiveLink] = useState('spaces');
  const router = useRouter();

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

  const handleLogout = async () => {
    await signOutWithGoogle();
    router.push('/');
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
              <button
                onClick={() => changeActiveLink('saved')}
                className={`${styles.saved_documents_button} ${activeLink === 'saved' && styles.active}`}
              >
                Kaydedilenler
              </button>
              <button className={styles.search_button} onClick={() => router.push('/search')}>
                DeepLex'te Arayın
              </button>
              <button className={styles.logout_button} onClick={handleLogout}>
                Çıkış Yap
              </button>
            </div>
            <div className={styles.footer}>&copy; 2023. All rights reserved.</div>
          </div>
          {activeLink === 'spaces' && (
            <div className={styles.spaces__container}>
              <DashboardSpacesContainer />
            </div>
          )}
          {activeLink === 'saved' && (
            <div className={styles.spaces__container}>
              <DashboardBookmarksContainer />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
