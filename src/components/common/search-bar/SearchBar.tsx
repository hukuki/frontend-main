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
              placeholder={`${category.toLocaleUpperCase().charAt(0) + category.substring(1)} arayın`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit(search, category);
                }
              }}
              style={{
                border: '2px solid',
                borderColor: theme.colors.blue['400'],
                background: theme.colorMode === 'dark' ? theme.colors.container.dark : theme.colors.container.light,
                color: theme.colorMode === 'dark' ? theme.colors.text.primaryLight : theme.colors.text.primaryDark,
              }}
            />
          </div>
          <div className={styles['filter-options__container']}>
            <Menu computePositionOnMount={true}>
              <MenuButton>
                {category}
                <ChevronDownIcon />
              </MenuButton>
              <MenuList className={styles['menu-list']}>
                <MenuOptionGroup defaultValue="mevzuat" type="radio">
                  <MenuItemOption onClick={() => setCategory('mevzuat')} value="mevzuat" fontSize={'4rem'}>
                    Mevzuat
                  </MenuItemOption>
                  <MenuItemOption onClick={() => setCategory('içtihat')} value="içtihat" fontSize={'4rem'}>
                    İçtihat
                  </MenuItemOption>
                  <MenuItemOption onClick={() => setCategory('literatür')} value="literatür" fontSize={'4rem'}>
                    Literatür
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
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
