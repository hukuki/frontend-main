import React from "react";

// Components
import { Flex } from "@/components/base/layout";
import FilterMenu from "./FilterMenu";

const Search = () => {
  return (
    <Flex height="100%" gap="10px" padding="40px">
      <FilterMenu />
      <div style={{ color: "white" }}>SearchResults</div>
    </Flex>
  );
};

export default Search;
