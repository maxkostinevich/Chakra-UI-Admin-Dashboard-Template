import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack, useToast, Divider, Text } from '@chakra-ui/core'
import dayjs from 'dayjs';
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { getCall, postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'
import mda from "../../helpers/mda.json";

export default function NewCustomerEmployment(props) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formDetails, setFormDetails] = useState({
        staffId: "",
        mda: "",
        scheme: "",
        gradeLevel: "",
        step: "",
        dateOfFirstAppointment: "",
        retirementDate: "",
    })
    const [customerData, setCustomerData] = useState({});
    const [loading, setLoading] = useState(true);

    const toast = useToast()
    const history = useHistory()
    const { user } = useContext(UseUserContext);
    const { id } = props.match.params

    useEffect(() => {
        if (user.firstName !== "") {
            getCall(`customer/${id}`, user.token).then(res => {
                setCustomerData(res.data);
                setLoading(false);
            }, err => {
                console.log(err);
            })
        }
    }, [user])

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    const calculateRetirement = (firstAppointment) => {
        const serviceRetirement = dayjs(firstAppointment).add(35, 'y');
        const ageRetirement = dayjs(customerData.data.dateOfBirth).add(60, 'years');
        const retirementDate = Math.max(serviceRetirement, ageRetirement);
        setFormDetails(prev => {
            return { ...prev, retirementDate: dayjs(retirementDate).format('YYYY-MM-DD') }
        });
    }

    const mdaList = mda.map((mda, index) => (
        <option key={index} value={mda}>{mda}</option>
    ))

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { staffId, mda, scheme, gradeLevel, step, dateOfFirstAppointment, retirementDate } = formDetails
        const data = {
            staffId,
            mda,
            gradeLevel: scheme + "-" + gradeLevel + "/" + step,
            dateOfFirstAppointment,
            retirementDate
        }
        postCall(`customer/employment/${id}`, data, user.token).then(res => {
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
    if (loading) {

        return (<PageContent>
            <Heading as="h3">Loading...</Heading>
        </PageContent>)
    }
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
                            <Divider />
                            <Stack direction="row">
                                <FormControl isRequired>
                                    <FormLabel htmlFor="scheme">Scheme</FormLabel>
                                    <Select
                                        focusBorderColor="main.500"
                                        name="scheme"
                                        id="scheme"
                                        value={formDetails.scheme}
                                        placeholder="Scheme"
                                        onChange={(e) => handleChange(e, "scheme")}>
                                        <option value="CONPSS">CONPSS</option>
                                        <option value="CONHESS">CONHESS</option>
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="gradeLevel">Level</FormLabel>
                                    <Select
                                        focusBorderColor="main.500"
                                        name="gradeLevel"
                                        id="gradeLevel"
                                        value={formDetails.gradeLevel}
                                        placeholder="Grade Level"
                                        onChange={(e) => handleChange(e, "gradeLevel")}>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="step">Step</FormLabel>
                                    <Select
                                        focusBorderColor="main.500"
                                        name="step"
                                        id="step"
                                        value={formDetails.step}
                                        placeholder="Step"
                                        onChange={(e) => handleChange(e, "step")}>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Text>{formDetails.scheme + "-" + formDetails.gradeLevel + "/" + formDetails.step}</Text>
                            <Divider />
                            <FormControl isRequired>
                                <FormLabel htmlFor="mda">MDA</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="mda"
                                    id="mda"
                                    value={formDetails.mda}
                                    placeholder="MDA"
                                    onChange={(e) => handleChange(e, "mda")}
                                >
                                    {mdaList}
                                </Select>
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
                                    onChange={(e) => {
                                        handleChange(e, "dateOfFirstAppointment");
                                        calculateRetirement(e.target.value);
                                    }}
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
                                    disabled
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
