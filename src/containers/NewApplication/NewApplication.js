import { Box, FormControl, FormLabel, Heading, Input, Stack, Select, useToast, Button } from '@chakra-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'

export default function NewApplication(props) {
    const [formDetails, setFormDetails] = useState({
        amount: "",
        category: "",
        tenure: "",
        interestRate: ""
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
        postCall(`application/new/${id}`, formDetails, user.token).then(res => {
            toast({status: "success", title: res.message});
            history.push(`/new-application-guarantor/${res.data.id}`)
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
            title="New Application">
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Loan Details</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="amount">Amount</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={formDetails.amount}
                                    placeholder="Amount"
                                    onChange={(e) => handleChange(e, "amount")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="number"
                                    name="interestRate"
                                    id="interestRate"
                                    value={formDetails.interestRate}
                                    placeholder="Interest Rate"
                                    onChange={(e) => handleChange(e, "interestRate")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="tenure">Tenure</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="number"
                                    name="tenure"
                                    id="tenure"
                                    value={formDetails.tenure}
                                    placeholder="Tenure"
                                    onChange={(e) => handleChange(e, "tenure")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="amount">Category</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="category"
                                    id="category"
                                    value={formDetails.category}
                                    placeholder="Category"
                                    onChange={(e) => handleChange(e, "category")}
                                >
                                    <option value="salary">Salary</option>
                                    <option value="politicalAppointment">Political Appointment</option>
                                    <option value="other">Other</option>
                                </Select>
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
