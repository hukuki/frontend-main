import Head from "next/head";

import { Flex } from "../components/base/layout"
import { Text } from "../components/base/Text.tsx"
import { Button } from "../components/base/forms"
import { Grid } from "../components/base/Grid.tsx"

import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

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
      bgColor="background.black"
      boxShadow="0 2rem 3rem primary.400"
      >
        <Flex
        alignSelf="center"
        alignItems="center"
        justifyContent="space-between"
        borderRadius="5rem"
        px="4rem"
        py="1.25rem"
        marginTop="2rem"
        width="90vw"
        zIndex="2"
        fontFamily="Poppins"
        bgColor="container.dark"
        boxShadow="dark-lg"
        >
          <Text
          fontSize="4.5rem"
          fontWeight="300"
          letterSpacing="-.3rem"
          cursor="pointer"
          color="primary.400"
          onClick={() => router.push("/")}
          >
            DeepLex
          </Text>
          <Flex
          justifyContent="center"
          alignItems="center"
          >
            <Text
            height="100%"
            cursor="pointer"
            fontSize="2.5rem"
            fontWeight="200"
            transition="all .2s ease-in"
            marginRight="3rem"
            _hover={{
              color: "primary.400",
              transform: "scale(1.05)"
            }}
            onClick={() => router.push("/about")}
            >
              Neden DeepLex
            </Text>
            <Text
            height="100%"
            cursor="pointer"
            fontSize="2.5rem"
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
          </Flex>
          <Button
            variant="outline"
            fontSize="2.5rem"
            fontWeight="200"
            padding="2.5rem"
            borderRadius="1.5rem"
            onClick={() => router.push("/login")}
            >
              Giriş Yap
            </Button>
        </Flex>
        <Grid
        alignSelf="start"
        width="100vw"
        templateColumns="70% 1fr"
        alignItems="center"
        justifyContent="center"
        position="relative"
        px="4rem"
        >
          <Flex
          flexDir="column"
          justifyContent="space-between"
          alignItems="flex-start"
          marginLeft="10rem"
          >
            <Text
            fontFamily="Poppins"
            fontSize="12.8rem"
            lineHeight="1.4"
            fontWeight="300"
            background="linear-gradient(90.13deg,#d1aad7 .11%,#c88bc4 25.06%,#7b8fdd 50%,#86bff2 74.8%,#bbdef2 99.76%)"
            backgroundClip="text"
            >
              Döküman
            </Text>
            <Text
            fontFamily="Poppins"
            fontSize="8rem"
            fontWeight="300"
            >
               aramanın kısa yolu
            </Text>
            <Text
            fontFamily="Poppins"
            fontSize="2.5rem"
            maxW="100rem"
            lineHeight="5rem"
            marginTop="3rem"
            marginBottom="5rem"
            fontWeight="200"
            >
            DeepLex, legal döküman arama sürecinizi hızlandırarak verimliliğinizi artırır. Yapay zeka modelimiz ile işinize yarayan dökümanları bulmanız artık çok daha kolay
            </Text>
            <Button
            fontSize="2.5rem"
            fontWeight="300"
            px="2.5rem"
            py="3.5rem"
            borderRadius="10rem"
            onClick={() => router.push("/search")}
            >
              DeepLex'i Dene
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
        color="primary.400"
        >
          &copy; 2023. All rights reserved.
        </Flex>
      </Flex>
    </>
  );
}