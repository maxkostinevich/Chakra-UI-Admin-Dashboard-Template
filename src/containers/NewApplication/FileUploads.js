import { Box, FormControl, FormLabel, Heading, Input, Stack, Select, useToast, Button, Divider } from '@chakra-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'

export default function FileUploads(props) {
    const [formDetails, setFormDetails] = useState({
        firstAppointmentLetter: "",
        confirmationLetter: "",
        lastPaySlip: "",
        verificationPrintout: "",
        letterOfIntroduction: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id } = props.match.params;
    const toast = useToast();
    const history = useHistory();
    const { user } = useContext(UseUserContext);

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
            toast({ status: "success", title: res.message });
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
            title="Document Uploads">
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Documents</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="firstAppointmentLetter">First Appointment Letter</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="firstAppointmentLetter"
                                    id="firstAppointmentLetter"
                                    value={formDetails.firstAppointmentLetter}
                                    onChange={(e) => handleChange(e, "firstAppointmentLetter")}
                                />
                            </FormControl>
                            <Button
                                type="Next"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Upload
                            </Button>
                        </Stack>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="confirmationLetter">Confirmation Letter</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="confirmationLetter"
                                    id="confirmationLetter"
                                    value={formDetails.confirmationLetter}
                                    onChange={(e) => handleChange(e, "confirmationLetter")}
                                />
                            </FormControl>
                            <Button
                                type="Next"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Upload
                            </Button>
                        </Stack>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="lastPaySlip">Last Pay Slip</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="lastPaySlip"
                                    id="lastPaySlip"
                                    value={formDetails.lastPaySlip}
                                    onChange={(e) => handleChange(e, "lastPaySlip")}
                                />
                            </FormControl>
                            <Button
                                type="Next"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Upload
                            </Button>
                        </Stack>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="verificationPrintout">Verification Printout</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="verificationPrintout"
                                    id="verificationPrintout"
                                    value={formDetails.verificationPrintout}
                                    onChange={(e) => handleChange(e, "verificationPrintout")}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Upload
                            </Button>
                        </Stack>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="letterOfIntroduction">Letter of Introduction</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="letterOfIntroduction"
                                    id="letterOfIntroduction"
                                    value={formDetails.letterOfIntroduction}
                                    onChange={(e) => handleChange(e, "letterOfIntroduction")}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Upload
                            </Button>
                        </Stack>
                        <Divider/>
                        <Stack marginTop="1rem">
                            <Button
                                type="button"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Proceed
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </PageContainer>
        </PageContent>
    )
}
