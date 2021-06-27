import { useToast } from "@chakra-ui/core";
import { Tr, Td, Table, Thead, Th, Tbody } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  FormControl,
  Input,
  IconButton,
} from "@chakra-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserStateContext } from "../../contexts/UserContext";
import { getCall } from "../../helpers/apiCall";
import toCurrency from "../../helpers/toCurrency";
import { PageContent } from "../Layout";
import { FaEllipsisV } from "react-icons/fa";

export default function Loans() {
  const user = useContext(UserStateContext);
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  useEffect(() => {
    getCall("loan/disbursed", user.token).then(
      (res) => {
        setLoans(res.data);
        setLoading(false);
      },
      () => {
        toast({
          status: "error",
          title: "something went wrong, please refresh",
        });
      }
    );
  }, [user, toast]);

  let loanList = loans
    .filter(
      (item) =>
        item.application.customer.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.application.customer.lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.application.customer.middleName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.application.customer.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.application.customer.employment.mda
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.application.customer.employment.staffId
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.application.customer.phoneNumber.includes(searchQuery)
    )
    .map((c, i) => {
      const {
        application: {
          customer: {
            firstName,
            lastName,
          },
        },
        totalLoan,
        commencementDate,
        endDate,
        schedule,
      } = c;
      const balance = schedule
        .filter((sch) => sch.paymentStatus === false)
        .reduce((t, c) => t + c.amount, 0);
      return (
        <Tr key={i}>
          <Td>{i + 1}</Td>
          <Td>{firstName}</Td>
          <Td>{lastName}</Td>
          <Td>{toCurrency(totalLoan, "NGN")}</Td>
          <Td>{toCurrency(balance, "NGN")}</Td>
          <Td>{new Date(commencementDate).toLocaleDateString("en-NG")}</Td>
          <Td>{new Date(endDate).toLocaleDateString("en-NG")}</Td>
          <Td data-column="item-actions">
            <Menu>
              <MenuButton as={IconButton} icon={<FaEllipsisV />}></MenuButton>
              <MenuList>
                <MenuItem
                  as={Link}
                  onClick={() => history.push(`/loans/${c.id}`)}
                >
                  View
                </MenuItem>
              </MenuList>
            </Menu>
          </Td>
        </Tr>
      );
    });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <PageContent title="Loans">
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
              <Th>Loan Balance</Th>
              <Th>Comm. Date</Th>
              <Th>End Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loanList.length < 1 ? (
              <Tr>
                <Td colSpan={8}>No Applications Found</Td>
              </Tr>
            ) : (
              loanList
            )}
          </Tbody>
        </Table>
      </Box>
    </PageContent>
  );
}
