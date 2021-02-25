import { Box, FormControl, FormLabel, Heading, Input, Stack, Button, Divider,useToast } from '@chakra-ui/core'
import axios from 'axios';
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
    const [uploadStatus, setUploadStatus] = useState({
        firstAppointmentLetter: false,
        confirmationLetter: false,
        lastPaySlip: false,
        verificationPrintout: false,
        letterOfIntroduction: false
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id } = props.match.params;
    const toast = useToast();
    const history = useHistory();
    const { user } = useContext(UseUserContext);

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.files[0] }
        });
        setUploadStatus(prev => {
            return { ...prev, [name]: false }
        });
    }

    const handleFileUpload = (file) => {
        const data = new FormData();
        data.append('file', formDetails[file]);
        axios.post(`http://localhost:8080/api/application/${id}/upload-document?document=${file}`, data, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setUploadStatus(prev => {
                return {...prev, [file]: true}
            })
            toast({
                status: 'success',
                title: res.data.response.message
            });
        }).catch(err => {
            toast({
                status: 'error',
                title: err.data.response.message
            })
        })
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
                                    accept="application/pdf"
                                    name="firstAppointmentLetter"
                                    id="firstAppointmentLetter"
                                    onChange={(e) => handleChange(e, "firstAppointmentLetter")}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                colorScheme="main"
                                onClick={() => handleFileUpload("firstAppointmentLetter")}
                                disabled={uploadStatus.firstAppointmentLetter}
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
                                    accept="application/pdf"
                                    name="confirmationLetter"
                                    id="confirmationLetter"
                                    onChange={(e) => handleChange(e, "confirmationLetter")}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                colorScheme="main"
                                onClick={() => handleFileUpload("confirmationLetter")}
                                disabled={uploadStatus.confirmationLetter}
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
                                    accept="application/pdf"
                                    name="lastPaySlip"
                                    id="lastPaySlip"
                                    onChange={(e) => handleChange(e, "lastPaySlip")}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                colorScheme="main"
                                onClick={() => handleFileUpload("lastPaySlip")}
                                disabled={uploadStatus.lastPaySlip}
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
                                    accept="application/pdf"
                                    name="verificationPrintout"
                                    id="verificationPrintout"
                                    onChange={(e) => handleChange(e, "verificationPrintout")}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                colorScheme="main"
                                onClick={() => handleFileUpload("verificationPrintout")}
                                disabled={uploadStatus.verificationPrintout}
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
                                    accept="application/pdf"
                                    name="letterOfIntroduction"
                                    id="letterOfIntroduction"
                                    onChange={(e) => handleChange(e, "letterOfIntroduction")}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                colorScheme="main"
                                onClick={() => handleFileUpload("letterOfIntroduction")}
                                disabled={uploadStatus.letterOfIntroduction}
                            >
                                Upload
                            </Button>
                        </Stack>
                        <Divider/>
                        <Stack marginTop="1rem">
                            <Button
                                type="button"
                                colorScheme="main"
                                onClick={() => history.push(`/applications/${id}`)}
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
