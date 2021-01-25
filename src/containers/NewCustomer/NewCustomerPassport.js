import { Stack, useToast } from '@chakra-ui/core'
import { Box } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PageContent } from '../Layout'

export default function NewCustomerPassport() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const history = useHistory()
    const { user } = useContext(UserContext);
    const { id } = props.match.params;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall(`customer/data/${id}`, formDetails, user.token).then(res => {
            toast({ status: "success", title: res.message });
            history.push(`/new-customer-employment/${id}`)
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
            title="Passport Photograph"
        >
            <PageContent>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Passport Photograph</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            {showPassport ? <Center><Box width="50%">
                                <Image src={formDetails.passportPreview} alt="Customer Pasport" />
                            </Box></Center> : null}
                            <FormControl isRequired>
                                <FormLabel htmlFor="passport">Passport Photograph</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="passport"
                                    id="passport"
                                    placeholder="Passport Photograph"
                                    onChange={(e) => {
                                        console.log(e.target.files[0]);
                                        setFormDetails(prev => {
                                            return { ...prev, passport: e.target.files[0], passportPreview: URL.createObjectURL(e.target.files[0]) }
                                        });
                                        setShowPassport(true);
                                    }}
                                />
                            </FormControl>
                        </Stack>
                    </form>
                </Box>
            </PageContent>
        </PageContent>
    )
}
