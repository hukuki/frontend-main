import React from "react";

// Components
import { Box, Flex } from "@/components/base/layout";
import { SearchBar } from "@/components/common";

const Search = () => {
  return (
    <Flex height="100%" align="center" justify="center">
      <div className="logo" />

      <Box w="50%" minW="500px" maxW="750px">
        <SearchBar />
      </Box>
    </Flex>
  );
};

export default Search;
