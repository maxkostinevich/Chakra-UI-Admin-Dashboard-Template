import React from "react";
import {
  Flex,
  Container,
  Image,
  Stack,
  Link,
  Text,
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuList,
  MenuButton,
} from "@chakra-ui/core";

import { FaCog, FaChevronDown } from "react-icons/fa";

import "./Layout.scss";

export default function Nav() {
  return (
    <Flex
      position={{ md: "fixed" }}
      bg="#ffffff"
      minH="4rem"
      w="100%"
      marginTop={{ md: "-4rem" }}
      zIndex="99"
    >
      <Container maxW="lg" paddingTop="5px">
        <Stack
          direction={["column", "row"]}
          alignItems={["flex-end", "center"]}
        >
          <Image boxSize="54px" fallbackSrc="https://via.placeholder.com/150" />
          <Text fontSize="xl" fontWeight="500">
            Awesome app
          </Text>
          <Stack direction={["column", "row"]} style={{ marginLeft: "5rem" }}>
            <Button colorScheme="navItem" variant="ghost">
              Dashboard
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                rightIcon={<Icon as={FaChevronDown} color="navItem.500" />}
              >
                Users
              </MenuButton>
              <MenuList>
                <MenuItem>View All</MenuItem>
                <MenuDivider />
                <MenuItem>Add New</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                rightIcon={<Icon as={FaCog} color="navItem.500" />}
              >
                Settings
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
