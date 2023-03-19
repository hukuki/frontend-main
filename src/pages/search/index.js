import React from "react";

// Components
import { GoLaw } from "react-icons/go";
import { Icon } from "@chakra-ui/icons";
import { Box, Flex } from "@/components/base/layout";
import { SearchBar } from "@/components/common";

const Search = () => {
  return (
    <Flex height="100%" align="center" direction="column" justify="center" gap="10px" paddingBottom="100px">
      <Icon as={GoLaw} color="dark.quinary" fontSize={200} />

      <Box w="50%" minW="500px" maxW="750px">
        <SearchBar />
      </Box>
    </Flex>
  );
};

export default Search;
