import { Center, FormControl, Stack, useToast, Heading, Button } from '@chakra-ui/core'
import { Box, Input, Image, FormLabel } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UseUserContext from '../../contexts/UserContext'
import { postCall } from '../../helpers/apiCall'
import { PageContainer, PageContent } from '../Layout'

export default function NewCustomerPassport(props) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const history = useHistory()
    const { user } = useContext(UseUserContext);
    const { id } = props.match.params;
    const [passport, setPassport] = useState("")
    const [passportPreview, setPassportPreview] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = new FormData()
        data.append('file', passport);
        axios.post(`http://localhost:8080/api/customer/passport/${id}`, data, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            toast({
                status: 'success',
                title: res.data.response.message
            });
            history.push(`/new-customer-employment/${id}`);
        }).catch(err => {
            toast({
                status: 'error',
                title: err.data.response.message
            })
        })
    };
    return (
        <PageContent
            title="Passport Photograph"
        >
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Passport Photograph</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            {passportPreview && <Center><Box width="50%">
                                <Image src={passportPreview} alt="Customer Pasport" />
                            </Box></Center>}
                            <FormControl isRequired>
                                <FormLabel htmlFor="passport">Passport Photograph</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="passport"
                                    id="passport"
                                    placeholder="Passport Photograph"
                                    onChange={(e) => {
                                        setPassport(e.target.files[0]);
                                        setPassportPreview(URL.createObjectURL(e.target.files[0]));
                                    }}
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
