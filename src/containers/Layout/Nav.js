import React, { useContext } from "react";
import {
  Flex,
  Container,
  Stack,
  Link,
  Text,
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  MenuList,
  MenuButton
} from "@chakra-ui/core";

import { FaCog, FaChevronDown } from "react-icons/fa";

import "./Layout.scss";
import UseUserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

export default function Nav() {
  const { user } = useContext(UseUserContext);
  const history = useHistory()
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
          {/* <Image
            boxSize="54px"
            fallbackSrc="https://user-images.githubusercontent.com/10295466/95871054-e472de00-0d75-11eb-93f4-2593ce275869.png"
          /> */}
          <Text fontSize="xl" fontWeight="500">
            FinLoan
          </Text>
          <Stack direction={["column", "row"]} style={{ marginLeft: "5rem" }}>
            <Button colorScheme="navItem" variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                rightIcon={<Icon as={FaChevronDown} color="navItem.500" />}
              >
                Customers
              </MenuButton>
              <MenuList>
                <MenuItem><Link href="/new-customer">Add New</Link></MenuItem>
                <MenuDivider />
                <MenuItem><Link href="/customers">View All</Link></MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                rightIcon={<Icon as={FaChevronDown} color="navItem.500" />}
              >
                Applications
              </MenuButton>
              <MenuList>
                {/* <MenuItem><Link href="/new-application">New Application</Link></MenuItem>
                <MenuDivider /> */}
                <MenuItem><Link href="/applications">View All Applications</Link></MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                rightIcon={<Icon as={FaChevronDown} color="navItem.500" />}
              >
                Financials
              </MenuButton>
              <MenuList>
                <MenuItem><Link href="/loans">View All</Link></MenuItem>
                <MenuItem><Link href="/loans/active">Active Loans</Link></MenuItem>
                <MenuItem><Link href="/loans/applications">Loan Applications</Link></MenuItem>
                <MenuDivider />
                <MenuItem><Link href="/new-loan">New Application</Link></MenuItem>
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
                <MenuItem>My Account</MenuItem>
                {user && <>
                  {user.role === "super-admin" ?
                    <>
                      <MenuItem onClick={() => history.push('/admin-users')}>Admin Users</MenuItem>
                    </> : null}
                </>}
                <MenuDivider />
                <MenuItem onClick={() => {
                  window.localStorage.removeItem('user');
                  history.push('/login')
                }}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
