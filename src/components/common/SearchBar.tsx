import React, { useState } from "react";
import { defineStyle, defineStyleConfig, MenuOptionGroup } from "@chakra-ui/react";

// Components
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, Button } from "@/components/base/forms";
import { Menu, MenuButton, MenuList, MenuItemOption } from "@chakra-ui/react";

// Component
export const SearchBar = () => {
  const [category, setCategory] = useState("mevzuat");

  return (
    <InputGroup bg="dark.secondary" borderRadius="25px">
      <Input placeholder={`${category} arayın`} borderRadius="25px" />
      <InputRightElement width="fit-content" borderRadius="25px" paddingEnd="10px">
        <Menu placement="bottom-end">
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
  );
};

export default SearchBar;
