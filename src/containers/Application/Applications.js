import {
  Box,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  FormControl,
} from "@chakra-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getCall } from "../../helpers/apiCall";
import { UserStateContext } from "../../contexts/UserContext";
import { PageContent } from "../Layout";
import { Link, useHistory } from "react-router-dom";
import { Table, Tbody, Thead, Tr, Td, Th } from "@chakra-ui/react";
import toCurrency from "../../helpers/toCurrency";

import "../Layout/Table/Table.scss";
import { FaEllipsisV } from "react-icons/fa";

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useContext(UserStateContext);
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (user.firstName !== "") {
      getCall("application/view-all", user.token).then(
        (res) => {
          console.log(res);
          setApplications(res.data);
          setLoading(false);
        },
        (err) => {
          toast({ status: "error", title: err.message });
        }
      );
    }
  }, [user, toast]);

  let applicationList = applications
    .filter(
      (item) =>
        item.customer.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.customer.lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.phoneNumber.includes(searchQuery)
    )
    .map((c, i) => (
      <Tr key={i}>
        <Td>{i + 1}</Td>
        <Td>{c.customer.firstName}</Td>
        <Td>{c.customer.lastName}</Td>
        <Td>{toCurrency(c.amount, "NGN")}</Td>
        <Td>{c.lineManagerApproval ? "Yes" : "No"}</Td>
        <Td>{c.managerApproval ? "Yes" : "No"}</Td>
        <Td>{new Date(c.created).toLocaleDateString("en-NG")}</Td>
        <Td data-column="item-actions">
          <Menu>
            <MenuButton as={IconButton} icon={<FaEllipsisV />}></MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                onClick={() => history.push(`/applications/${c.id}`)}
              >
                View
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    ));

  if (loading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  } else {
    return (
      <PageContent
        title="Applications"
        // primaryAction={{
        //     content: "Add Application",
        //     onClick: () => {
        //         history.push("/new-application")
        //     },
        // }}
      >
        <Box
          width="100%"
          bg={"secondary.card"}
          color={"gray.800"}
          rounded="lg"
          p={5}
        >
          <Box my={4} mx="auto" width={{ sm: "100%", md: "50%" }}>
            <FormControl>
              <Input
                type="text"
                placeholder="Search"
                focusBorderColor="main.500"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </FormControl>
          </Box>
          <Table className="chakra-ui-table">
            <Thead>
              <Tr>
                <Th>SN</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Amount</Th>
                <Th>Line Mgr Approval</Th>
                <Th>Mgr Approval</Th>
                <Th>App. Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applicationList.length < 1 ? (
                <Tr>
                  <Td colSpan={8}>No Applications Found</Td>
                </Tr>
              ) : (
                applicationList
              )}
            </Tbody>
          </Table>
        </Box>
      </PageContent>
    );
  }
}
