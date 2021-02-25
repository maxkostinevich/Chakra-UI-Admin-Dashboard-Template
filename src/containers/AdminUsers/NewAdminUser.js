import { Box, FormControl, FormLabel, Heading, Input, Stack, Select, useToast, Button } from '@chakra-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'

export default function NewAdminUser(props) {
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        phoneNumber: "",
        password: "default"
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const {id} = props.match.params;
    const toast = useToast();
    const history = useHistory();
    const {user} = useContext(UseUserContext);

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall(`admin/auth/create`, formDetails, user.token).then(res => {
            toast({status: "success", title: res.message});
            history.push(`/admin-users`);
        }, err => {
            setIsSubmitting(false);
            toast({
                title: err.message,
                status: "error"
            })
        })
    };
    return (
        <PageContent
            title="Add Admin User">
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Admin User Details</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formDetails.firstName}
                                    placeholder="First Name"
                                    onChange={(e) => handleChange(e, "firstName")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formDetails.lastName}
                                    placeholder="Last Name"
                                    onChange={(e) => handleChange(e, "lastName")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formDetails.email}
                                    placeholder="Email"
                                    onChange={(e) => handleChange(e, "email")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="role">Role</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="role"
                                    id="role"
                                    value={formDetails.role}
                                    placeholder="Role"
                                    onChange={(e) => handleChange(e, "role")}
                                >
                                    <option value="super-admin">Super Admin</option>
                                    <option value="admin">Admin</option>
                                    <option value="lineManager">Line Manager</option>
                                    <option value="manager">Manager</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={formDetails.phoneNumber}
                                    placeholder="Phone Number"
                                    onChange={(e) => handleChange(e, "phoneNumber")}
                                />
                            </FormControl>
                        </Stack>
                        <Stack marginBottom="1rem">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Create
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </PageContainer>
        </PageContent>
    )
}
