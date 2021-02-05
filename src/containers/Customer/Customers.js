import { Box, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, useToast, FormControl } from "@chakra-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getCall } from "../../helpers/apiCall";
import UseUserContext from "../../contexts/UserContext"
import { PageContent } from "../Layout";
import { Link, useHistory } from "react-router-dom";
import { Table, Tbody, Thead, Tr, Td, Th } from "@chakra-ui/react";

import "../Layout/Table/Table.scss";
import { FaEllipsisV } from "react-icons/fa";

export default function Customers() {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useContext(UseUserContext);
    const toast = useToast();
    const history = useHistory()

    useEffect(() => {
        if (user.firstName !== "") {
            getCall("customer", user.token).then(res => {
                console.log(res);
                setCustomers(res.data);
                setLoading(false);
            }, err => {
                toast({ status: "error", title: err.message });
            })
        }
    }, [user, toast])


    let customerList = customers.filter(item => item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || item.lastName.toLowerCase().includes(searchQuery.toLowerCase())  || item.email.toLowerCase().includes(searchQuery.toLowerCase()) || item.phoneNumber.includes(searchQuery)).map((c, i) => (
        <Tr key={i}>
            <Td>{i + 1}</Td>
            <Td>{c.firstName}</Td>
            <Td>{c.lastName}</Td>
            <Td>{c.email}</Td>
            <Td>{c.phoneNumber}</Td>
            <Td>{new Date(c.created).toLocaleDateString("en-NG")}</Td>
            <Td data-column="item-actions">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<FaEllipsisV />}
                    ></MenuButton>
                    <MenuList>
                        <MenuItem as={Link} onClick={() => history.push(`/customers/${c.id}`)}>View</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    ))

    if (loading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>

        )
    } else {
        return (
            <PageContent
                title="Customers"
                primaryAction={{
                    content: "Add Customer",
                    onClick: () => {
                        history.push("/new-customer")
                    },
                }}
            >
                <Box width="100%" bg={"secondary.card"} color={"gray.800"} rounded="lg" p={5}>
                    <Box my={4} mx="auto" width={{ sm: "100%", md: "50%" }}>
                        <FormControl>
                            <Input type="text" placeholder="Search" focusBorderColor="main.500" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                        </FormControl>
                    </Box>
                    <Table className="chakra-ui-table">
                        <Thead>
                            <Tr>
                                <Th>SN</Th>
                                <Th>First Name</Th>
                                <Th>Last Name</Th>
                                <Th>Email</Th>
                                <Th>Phone Number</Th>
                                <Th>Date Registered</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {customers.length < 1 ? <Td>No Customers Found</Td> : customerList}
                        </Tbody>
                    </Table>
                </Box>
            </PageContent>
        );
    }
}
