import { Box, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, useToast, FormControl } from "@chakra-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getCall } from "../../helpers/apiCall";
import { UserStateContext } from "../../contexts/UserContext"
import { PageContent } from "../Layout";
import { Link, useHistory } from "react-router-dom";
import { Table, Tbody, Thead, Tr, Td, Th } from "@chakra-ui/react";

import "../Layout/Table/Table.scss";
import { FaEllipsisV } from "react-icons/fa";

export default function AdminUsers() {
    const [loading, setLoading] = useState(true);
    const [adminUsers, setAdminUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const user = useContext(UserStateContext);
    const toast = useToast();
    const history = useHistory()

    useEffect(() => {
        if (user.firstName !== "") {
            getCall("admin/auth", user.token).then(res => {
                console.log(res);
                setAdminUsers(res.data);
                setLoading(false);
            }, err => {
                toast({ status: "error", title: err.message });
            })
        }
    }, [user, toast])


    let adminUserList = adminUsers.filter(item => item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || item.lastName.toLowerCase().includes(searchQuery.toLowerCase())  || item.email.toLowerCase().includes(searchQuery.toLowerCase()) || item.phoneNumber.includes(searchQuery)).map((c, i) => (
        <Tr key={i}>
            <Td>{i + 1}</Td>
            <Td>{c.firstName}</Td>
            <Td>{c.lastName}</Td>
            <Td>{c.phoneNumber}</Td>
            <Td>{c.email}</Td>
            <Td>{c.role}</Td>
            <Td>{c.status ? "Yes" : "No"}</Td>
            <Td data-column="item-actions">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<FaEllipsisV />}
                    ></MenuButton>
                    <MenuList>
                        {c.status ? <MenuItem as={Link} onClick={() => history.push(`/adminUsers/${c.id}`)}>Disable</MenuItem> : <MenuItem as={Link} onClick={() => history.push(`/activate-admin/${c.email}`)}>Activate</MenuItem>}
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
                title="AdminUsers"
                primaryAction={{
                    content: "Add Admin User",
                    onClick: () => {
                        history.push("/new-admin-user")
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
                                <Th>Phone Number</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Active</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {adminUserList.length < 1 ? <Tr><Td colSpan={8}>No Admin Users Found</Td></Tr> : adminUserList}
                        </Tbody>
                    </Table>
                </Box>
            </PageContent>
        );
    }
}
