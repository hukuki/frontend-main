import React from 'react';

import { Flex } from '../components/base/layout';
import { Button } from '../components/base/forms';

import { useRouter } from 'next/router';
import useAuthContext from '../context/AuthContextProvider';
import { Avatar, Menu, MenuButton, MenuList, MenuItem, Spinner } from '@chakra-ui/react';
import styles from './HomePage.module.css';

export default function Home() {
  const router = useRouter();

  const { user, loading, signOutWithGoogle } = useAuthContext();

  const handleLogout = async () => {
    await signOutWithGoogle(null);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar__container}>
          <span className={styles.navbar__logo} onClick={() => router.push('/')}>
            DeepLex
          </span>
          <div className={styles.navbar__links_container}>
            <span className={styles.navbar__link} onClick={() => router.push('/about')}>
              Neden DeepLex
            </span>
            <span className={styles.navbar__link} onClick={() => router.push('/team')}>
              Takım
            </span>
          </div>
          {loading ? (
            <Spinner size="xl" />
          ) : user ? (
            <Menu>
              <MenuButton>
                <Avatar size="xl" src={user.photoURL} />
              </MenuButton>
              <MenuList>
                <MenuItem px="1.5rem" py="1.5rem" onClick={handleLogout} fontSize="2rem">
                  Çıkış Yap
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button fontSize="2.5rem" fontWeight="200" padding="2.5rem" borderRadius="1.5rem" onClick={handleLogin}>
              Giriş Yap
            </Button>
          )}
        </div>
        <div className={styles.content__container}>
          <div className={styles.content__right_container}>
            <span className={styles.content__right_header}>Döküman</span>
            <span className={styles.content__right_subheader}>aramanın kısa yolu</span>
            <span className={styles.content__right_parag}>
              DeepLex, legal döküman arama sürecinizi hızlandırarak verimliliğinizi artırır. Yapay zeka modelimiz ile işinize yarayan dökümanları
              bulmanız artık çok daha kolay
            </span>
            <Button fontSize="2.5rem" fontWeight="300" px="2.5rem" py="3.5rem" borderRadius="2rem" onClick={() => router.push('/search')}>
              DeepLex&apos;i Dene
            </Button>
          </div>
        </div>
        <Flex
          maxWidth="81rem"
          width="100%"
          px="2rem"
          py="2rem"
          fontFamily="Poppins"
          fontSize="1.5rem"
          alignItems="center"
          justifyContent="center"
          my="0"
          mx="auto"
          zIndex="10"
          color="primary.400"
        >
          &copy; 2023. All rights reserved.
        </Flex>
      </div>
    </>
  );
}
