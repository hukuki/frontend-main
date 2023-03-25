import Head from "next/head";
import Hero from "../components/hero.tsx";
import styles from "./HomePage.module.css";
import Image from "next/image";

import { Flex } from "../components/base/layout"
import { Text } from "../components/base/Text.tsx"
import { Button } from "../components/base/forms"
import { Grid } from "../components/base/Grid.tsx"

import { Link } from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <Flex
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      minH="100vh"
      overflow="hidden"
      position="relative"
      zIndex="1"
      bgColor="background.dark"
      boxShadow="0 2rem 3rem primary.400"
      >
        <svg className={styles["container__background-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill-opacity="1" d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        <Flex
        alignSelf="center"
        alignItems="center"
        justifyContent="space-between"
        borderRadius="5rem"
        px="4rem"
        py="1.25rem"
        marginTop="2rem"
        maxW="100rem"
        width="100%"
        zIndex="2"
        fontFamily="Poppins"
        bgColor="container.dark"
        boxShadow="dark-lg"
        >
          <Text
          fontSize="3.5rem"
          fontWeight="700"
          letterSpacing="-.3rem"
          cursor="pointer"
          flex="1"
          color="primary.400"
          >
            <Link href="/">DeepLex</Link>
          </Text>
          <Flex
          justifyContent="center"
          alignItems="center"
          >
            <Text
            height="100%"
            cursor="pointer"
            fontSize="1.75rem"
            fontWeight="200"
            transition="all .2s ease-in"
            marginRight="3rem"
            _hover={{
              color: "primary.400",
              transform: "scale(1.05)"
            }}
            >
              <Link href="/about">Neden DeepLex</Link>
            </Text>
            <Text
            height="100%"
            cursor="pointer"
            fontSize="1.75rem"
            fontWeight="200"
            transition="all .2s ease-in"
            marginRight="3rem"
            _hover={{
              color: "primary.400",
              transform: "scale(1.05)"
            }}
            >
              Takım
            </Text>
            <Button
            variant="outline"
            fontSize="1.75rem"
            fontWeight="200"
            padding="2rem"
            borderRadius="1.5rem"
            >
              <Link href="/login">Giriş Yap</Link>
            </Button>
          </Flex>
        </Flex>
        <Grid
        alignSelf="center"
        maxW="120rem"
        width="100%"
        templateColumns="1fr 1fr"
        alignItems="center"
        justifyContent="center"
        position="relative"
        >
          <Flex
          flexDir="column"
          justifyContent="space-between"
          alignItems="flex-start"
          marginLeft="3rem"
          >
            <Text
            fontFamily="Poppins"
            fontSize="4.75rem"
            lineHeight="1.4"
            >
              Döküman aramanın
            </Text>
            <Text
            fontFamily="Poppins"
            fontSize="4.75rem"
            >
              kısa yolu
            </Text>
            <Text
            fontFamily="Poppins"
            fontSize="2rem"
            maxW="60rem"
            lineHeight="2.5rem"
            marginTop="2rem"
            marginBottom="2rem"
            fontWeight="200"
            >
            DeepLex, legal döküman arama sürecinizi hızlandırarak verimliliğinizi artırır. Yapay zeka modelimiz ile işinize yarayan dökümanları bulmanız artık çok daha kolay
            </Text>
            <Button
            fontSize="2rem"
            fontWeight="400"
            px="1.5rem"
            py="2.5rem"
            borderRadius="1rem"
            >
              <Link href="/search">DeepLex'i Dene</Link>
            </Button>
          </Flex>
        </Grid>
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
        >
          &copy; 2023. All rights reserved.
        </Flex>
      </Flex>
    </>
  );
}