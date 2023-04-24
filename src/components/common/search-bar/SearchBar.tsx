import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { FormControl, MenuOptionGroup } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';

// Components
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { InputGroup } from '@/components/base/forms';
import { Menu, MenuButton, MenuList, MenuItemOption } from '@chakra-ui/react';

// Types
type SearchBarProps = {
  onSubmit: (search: string, category: string) => void;
  initialSearch?: string;
  initialCategory?: 'mevzuat' | 'içtihat' | 'literatür';
  colorMode?: string;
};

// Component CSS
import styles from './SearchBar.module.css';
import { useTheme } from '@chakra-ui/react';

// Animation Variants

const searchBar = {
  initial: {
    scale: 0.98,
  },
  focus: {
    scale: 1,
  },
};

// Component
export const SearchBar: FunctionComponent<SearchBarProps> = ({ onSubmit, initialSearch, initialCategory }) => {
  const [search, setSearch] = useState(initialSearch ?? '');
  const [category, setCategory] = useState(initialCategory ?? 'mevzuat');
  const theme = useTheme();

  return (
    <motion.div layout layoutId="motionSearchBar">
      <FormControl className={styles['searchbar__form']}>
        <InputGroup className={styles['searchbar__input-group']}>
          <div className={styles['searchbar__container']}>
            <input
              className={`${styles[`searchbar__input`]}`}
              placeholder="Döküman arayın"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit(search, category);
                }
              }}
            />
          </div>
          <div className={styles['filter-options__container']}>
            <button
              className={styles['search__button']}
              type="submit"
              style={{
                color: theme.colorMode === 'dark' ? theme.colors.blue['600'] : theme.colors.blue['800'],
              }}
            >
              <SearchIcon />
            </button>
          </div>
        </InputGroup>
      </FormControl>
    </motion.div>
  );
};

export default SearchBar;
