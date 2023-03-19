import React from "react";
import { useRouter } from "next/router";

// Components
import { Card, CardHeader, CardFooter } from "@/components/base/dataDisplay";
import { Flex, Box } from "@/components/base/layout";
import { SearchBar } from "@/components/common";

// Mock Data
import { SearchResults as mockSearchResults } from "@/mocks/search";

const SearchResults = () => {
  const router = useRouter();
  const { search, category } = router.query;

  return (
    <Flex flex={1} direction="column" gap={5}>
      <Box width="100%">
        <SearchBar
          initialSearch={search}
          initialCategory={category}
          onSubmit={(search, category) => router.push(`/search?category=${category}&search=${search}`)}
        />
      </Box>

      <Box style={{ overflow: "auto" }} borderRadius="10px" paddingRight="5px">
        <Flex flex={1} direction="column" gap={3}>
          {mockSearchResults.map((result) => (
            <Card key={result.id} onClick={() => router.push(`/search/${result.id}`)} height="400px">
              <CardHeader title={result.title} />
              <CardFooter description={result.description} tags={result.tags} />
            </Card>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SearchResults;
