import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

// Components
import { Card, CardHeader, CardFooter } from "@/components/base/dataDisplay";
import { CircularProgress } from "@/components/base/feedback";
import { Flex, Box } from "@/components/base/layout";
import { SearchBar } from "@/components/common/search-bar";

// Mock Data
import { SearchResults as mockSearchResults } from "@/mocks/search";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const SearchResults = () => {
  const router = useRouter();
  const { search, category } = router.query;

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Flex flex={1} direction="column" gap={5}>
      <Box width="100%">
        <SearchBar
          initialSearch={search}
          initialCategory={category}
          onSubmit={(search, category) => router.push(`/search?category=${category}&search=${search}`)}
        />
      </Box>

      <Box flex={1} style={{ overflow: "auto" }} borderRadius="10px" paddingRight="5px">
        {loading && (
          <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
            <CircularProgress isIndeterminate color="dark.secondary" />
          </Flex>
        )}

        {!loading && (
          <motion.ul initial="hidden" animate="visible" variants={container}>
            <Flex flex={1} direction="column" gap={3}>
              {searchResults.map((result, index) => (
                <motion.li variants={item} key={result.id} transition={{ delay: index * 0.3 }}>
                  <Card key={result.id} onClick={() => router.push(`/search/${result.id}`)} height="300px">
                    <CardHeader title={result.title} />
                    <CardFooter description={result.description} tags={result.tags} />
                  </Card>
                </motion.li>
              ))}
            </Flex>
          </motion.ul>
        )}
      </Box>
    </Flex>
  );
};

export default SearchResults;
