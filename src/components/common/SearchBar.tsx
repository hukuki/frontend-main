import React from "react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// Components
import { Input, InputGroup, InputRightElement, Button } from "@/components/base/forms";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

// Styles
const config = defineStyleConfig({
  baseStyle: {
    color: "main.primary",
    bg: "main.secondary",
    borderRadius: "25px",
  },
});

const InputStyle = defineStyle({
  baseStyle: {
    color: "main.primary",
    bg: "main.secondary",
    borderRadius: "25px",
  },
});

const InputRightElementStyle = defineStyle({
  baseStyle: {
    color: "main.primary",
    bg: "main.quinary",
    borderRadius: "25px",
  },
});

const ButtonStyle = defineStyle({
  baseStyle: {
    color: "main.secondary",
    bg: "main.quinary",
    borderRadius: "25px",
  },
});

const MenuStyle = defineStyle({
  baseStyle: {
    color: "main.primary",
    bg: "main.secondary",
    borderRadius: "25px",
  },
});

const MenuItemStyle = defineStyle({
  baseStyle: {
    color: "main.primary",
    bg: "main.secondary",
    borderRadius: "25px",
  },
});

const MenuListStyle = defineStyle({
  baseStyle: {
    color: "main.primary",
    bg: "main.secondary",
    borderRadius: "25px",
  },
});

// Component
export const SearchBar = () => {
  return (
    <InputGroup color="main.primary" borderRadius="25px">
      <Input placeholder="Search" borderRadius="25px" />
      <InputRightElement width="fit-content" borderRadius="25px">
        <Menu>
          <MenuButton>All</MenuButton>
          <MenuList>
            <MenuItem>Posts</MenuItem>
            <MenuItem>Users</MenuItem>
            <MenuItem>Tags</MenuItem>
          </MenuList>
        </Menu>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
