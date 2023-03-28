import React from "react";

// Components
import { Flex } from "@/components/base/layout";
import FilterMenu from "./FilterMenu";
import SearchResults from "./SearchResults";

const Search = () => {
  return (
    <Flex height="100%" width="100%" gap={5} padding="40px">
      <FilterMenu />
      <SearchResults />
    </Flex>
  );
};

export default Search;
