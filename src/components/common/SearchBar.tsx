import React, { FunctionComponent, useState } from "react";
import { defineStyle, defineStyleConfig, FormControl, MenuOptionGroup } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Components
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@/components/base/forms";
import { Menu, MenuButton, MenuList, MenuItemOption } from "@chakra-ui/react";

// Types
type SearchBarProps = {
  onSubmit: (search: string, category: string) => void;
  initialSearch?: string;
  initialCategory?: "mevzuat" | "içtihat" | "literatür";
};

// Component
export const SearchBar: FunctionComponent<SearchBarProps> = ({ onSubmit, initialSearch, initialCategory }) => {
  const [search, setSearch] = useState(initialSearch ?? "");
  const [category, setCategory] = useState(initialCategory ?? "mevzuat");

  return (
    <motion.div layout layoutId="motionSearchBar" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <FormControl>
        <InputGroup bg="dark.secondary" borderRadius="25px">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>

          <Input
            placeholder={`${category} arayın`}
            borderRadius="25px"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit(search, category);
              }
            }}
            autoFocus
          />

          <InputRightElement width="fit-content" borderRadius="25px" paddingEnd="10px">
            <Menu placement="bottom-end" computePositionOnMount={true}>
              <MenuButton>
                {category}
                <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuOptionGroup defaultValue="mevzuat" type="radio">
                  <MenuItemOption onClick={() => setCategory("mevzuat")} value="mevzuat">
                    Mevzuat
                  </MenuItemOption>
                  <MenuItemOption onClick={() => setCategory("içtihat")} value="içtihat">
                    İçtihat
                  </MenuItemOption>
                  <MenuItemOption onClick={() => setCategory("literatür")} value="literatür">
                    Literatür
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </motion.div>
  );
};

export default SearchBar;
