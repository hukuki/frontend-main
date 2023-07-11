import React from 'react';
import styles from './Navbar.module.css';
import { Avatar, MenuButton, MenuList, Menu, MenuItem } from '@chakra-ui/react';
import useAuthContext from '../../../context/AuthContextProvider';
import { useRouter } from 'next/router';

function Navbar() {
  const { user, signOutWithGoogle } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    await signOutWithGoogle();
  };
  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.avatar__container}>
          <Menu>
            <MenuButton>
              <Avatar size="lg" src={user.photoURL} />
            </MenuButton>
            <MenuList>
              <MenuItem px="1.5rem" py="1.5rem" onClick={handleLogout} fontSize="2rem">
                Çıkış Yap
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
      <div className={styles.navbar_links__container}>
        <div className={styles.dashboard_link}>
          {user && (
            <button
              onClick={() => {
                router.push('/dashboard');
              }}
              className={styles.dashboard_button}
            >
              Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
