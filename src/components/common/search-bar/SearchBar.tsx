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

// Component CSS
import styles from "./SearchBar.module.css"
import { useRouter } from "next/router";

// Component
export const SearchBar: FunctionComponent<SearchBarProps> = ({ onSubmit, initialSearch, initialCategory }) => {

  const [search, setSearch] = useState(initialSearch ?? "");
  const [category, setCategory] = useState(initialCategory ?? "mevzuat");

  return (
    <motion.div layout layoutId="motionSearchBar" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <FormControl className={styles["searchbar__form"]}>
        <InputGroup className={styles["searchbar__input-group"]}>
          <div className={styles["searchbar__container"]}>
            <input
            className={styles["searchbar__input"]}
            placeholder={`${category.toLocaleUpperCase().charAt(0) + category.substring(1)} arayın`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit(search, category);
              }
            }}
            autoFocus
            />
          </div>
          <div className={styles["filter-options__container"]}>
            <Menu computePositionOnMount={true}>
                <MenuButton>
                  {category}
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList className={styles["menu-list"]}>
                  <MenuOptionGroup defaultValue="mevzuat" type="radio">
                    <MenuItemOption onClick={() => setCategory("mevzuat")} value="mevzuat" fontSize={"4rem"}>
                      Mevzuat
                    </MenuItemOption>
                    <MenuItemOption onClick={() => setCategory("içtihat")} value="içtihat" fontSize={"4rem"}>
                      İçtihat
                    </MenuItemOption>
                    <MenuItemOption onClick={() => setCategory("literatür")} value="literatür" fontSize={"4rem"}>
                      Literatür
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <button className={styles["search__button"]} type="submit">
                <SearchIcon />
              </button>
            </div>
            </InputGroup>
        </FormControl>
    </motion.div>
  );
};

export default SearchBar;
