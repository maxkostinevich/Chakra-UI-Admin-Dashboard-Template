import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack, useToast } from '@chakra-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { getCall, postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'

export default function NewCustomerEmployment(props) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formDetails, setFormDetails] = useState({
        staffId: "",
        mda: "",
        gradeLevel: "",
        dateOfFirstAppointment: "",
        retirementDate: "",
    })

    const toast = useToast()
    const history = useHistory()
    const { user } = useContext(UserContext);
    const {id} = props.match.params

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    useEffect(() => {
        if(user.firstName !== ""){
            console.log(user);
            getCall(`customer/${id}`, user.token).then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            })
        }
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall(`customer/employment/${id}`, formDetails, user.token).then(res => {
            toast({ status: "success", title: res.message });
            history.push(`/new-customer-payment/${id}`)
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
            title="New Customer"
        >
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Employment Details</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="staffId">Staff ID (BSN)</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="staffId"
                                    id="staffId"
                                    value={formDetails.staffId}
                                    placeholder="Staff ID (BSN)"
                                    onChange={(e) => handleChange(e, "staffId")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="gradeLevel">Grade Level</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="gradeLevel"
                                    id="gradeLevel"
                                    value={formDetails.gradeLevel}
                                    placeholder="Grade Level"
                                    onChange={(e) => handleChange(e, "gradeLevel")}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="mda">MDA</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="mda"
                                    id="mda"
                                    value={formDetails.mda}
                                    placeholder="MDA"
                                    onChange={(e) => handleChange(e, "mda")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="dateOfFirstAppointment">Date of First Appointment</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="date"
                                    name="dateOfFirstAppointment"
                                    id="dateOfFirstAppointment"
                                    value={formDetails.dateOfFirstAppointment}
                                    placeholder="Date of First Appointment"
                                    onChange={(e) => handleChange(e, "dateOfFirstAppointment")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="retirementDate">Retirement Date</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="date"
                                    name="retirementDate"
                                    id="retirementDate"
                                    value={formDetails.retirementDate}
                                    placeholder="Retirement Date"
                                    onChange={(e) => handleChange(e, "retirementDate")}
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
                                Next
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </PageContainer>
        </PageContent>
    )
}
