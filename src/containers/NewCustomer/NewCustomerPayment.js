import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack, useToast } from '@chakra-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout';
import banks from '../../helpers/banks.json'

export default function NewCustomerPayment(props) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formDetails, setFormDetails] = useState({
        bankName: "",
        accountNumber: "",
    })

    const toast = useToast()
    const history = useHistory()
    const { user } = useContext(UseUserContext);
    const {id} = props.match.params

    const bankList = banks.map((bank, i) => (
        <option key={i}>{bank.name}</option>
    ))

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall(`customer/payment/${id}`, formDetails, user.token).then(res => {
            toast({ status: "success", title: res.message });
            history.push(`/customers/${id}`)
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
            title="Customer Payment Details"
        >
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Payment Details</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="bankName">Bank Name</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="bankName"
                                    id="bankName"
                                    value={formDetails.bankName}
                                    placeholder="Bank Name"
                                    onChange={(e) => handleChange(e, "bankName")}
                                >
                                    {bankList}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="number"
                                    name="accountNumber"
                                    id="accountNumber"
                                    value={formDetails.accountNumber}
                                    placeholder="Account Number"
                                    onChange={(e) => handleChange(e, "accountNumber")}>
                                </Input>
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
