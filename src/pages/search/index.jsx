import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

// Components
import { GoLaw } from "react-icons/go";
import { Icon } from "@chakra-ui/icons";
import { Box, Flex } from "@/components/base/layout";
import { SearchBar } from "@/components/common/search-bar";

// CSS
import styles from "./SearchPage.module.css"

const SearchPage = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    router.push("/search/results")
  }
    return (
    <>
      <div className={styles.container}>
        <div className={styles["logo__container"]}>
          <h1 className={styles.logo}>DeepLex</h1>
        </div>
        <div className={styles["searchbar__container"]}>
          <SearchBar onSubmit={handleSubmit} />
        </div>
      </div>
      {/*
    <Flex height="100%" align="center" direction="column" justify="center" gap="10px" paddingBottom="100px">
      <Icon as={GoLaw} color="dark.quinary" fontSize={200} />
      <Box w="50%" minW="500px" maxW="750px">
        <SearchBar onSubmit={(search, category) => router.push(`/search-results?category=${category}&search=${search}`)} />
      </Box>
    </Flex>
    */}
    </>
  );
};

export default SearchPage;
