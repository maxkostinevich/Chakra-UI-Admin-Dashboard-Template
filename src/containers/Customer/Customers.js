import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/core";
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
    let headers = [
        {
            id: "sno",
            title: "SN",
        },
        {
            id: "firstName",
            title: "First Name",
        },
        {
            id: "lastName",
            title: "Last Name",
        },
        {
            id: "email",
            title: "Email",
        },
        {
            id: "phoneNumber",
            title: "Phone Number",
        },
        {
            id: "createdAt",
            title: "Date Registered",
        },
    ];

    let customerList = customers.map((c, i) => (
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
