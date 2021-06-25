import { Box, FormControl, FormLabel, Heading, Input, Stack, useToast, Button } from '@chakra-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserStateContext } from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'

export default function NewGuarantor(props) {
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        placeOfWork: "",
        designation: "",
        phoneNumber: "",
        address: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const {id} = props.match.params;
    const toast = useToast();
    const history = useHistory();
    const user = useContext(UserStateContext);

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall(`application/${id}/add-guarantor`, formDetails, user.token).then(res => {
            toast({status: "success", title: res.message});
            history.push(`/new-application-uploads/${id}`);
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
            title="Add Guarantor">
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Guarantor Details</Heading>
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
                                <FormLabel htmlFor="placeOfWork">Place of Work</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="placeOfWork"
                                    id="placeOfWork"
                                    value={formDetails.placeOfWork}
                                    placeholder="Place of Work"
                                    onChange={(e) => handleChange(e, "placeOfWork")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="designation">Designation</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="designation"
                                    id="designation"
                                    value={formDetails.designation}
                                    placeholder="Designation"
                                    onChange={(e) => handleChange(e, "designation")}
                                />
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
                            <FormControl isRequired>
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formDetails.address}
                                    placeholder="Address"
                                    onChange={(e) => handleChange(e, "address")}
                                />
                            </FormControl>
                        </Stack>
                        <Stack marginBottom="1rem">
                            <Button
                                type="Next"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Next
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </PageContainer>
        </PageContent>
    )
}
