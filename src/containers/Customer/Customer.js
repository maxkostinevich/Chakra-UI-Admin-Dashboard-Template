import { FormLabel, FormControl, Input, Grid, GridItem, Image, Select, Divider, Heading, Box } from '@chakra-ui/core';
import { Stack } from '@chakra-ui/core';
import dayjs from 'dayjs';
// import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { getCall } from '../../helpers/apiCall';
import { PageContent } from '../Layout'

export default function Customer(props) {
    const { id } = props.match.params;
    const { user } = useContext(UseUserContext);
    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        if (user.firstName !== "") {
            getCall(`customer/${id}`, user.token).then(res => {
                console.log(res);
                setCustomer(res.data);
                setLoading(false);
            }, err => { console.log(err) })
        }
    }, [user, id])

    if (loading) {
        return (<PageContent>
            <Heading as="h3">Loading...</Heading>
        </PageContent>)
    }
    return (
        <PageContent
            title={customer.firstName + " " + customer.lastName}
            primaryAction={{
                content: "New Loan Application",
                onClick: () => {
                    history.push(`${id}/new-application`);
                }
            }}
        // secondaryActions={[
        //     {
        //         content: "Edit Data",
        //         onClick: () => {

        //         }
        //     },
        //     {
        //         content: "Edit Employment",
        //         onClick: () => {

        //         }
        //     },
        //     {
        //         content: "Edit Payment",
        //         onClick: () => {

        //         }
        //     },
        // ]}
        >
            <Box width="100%" bg={"secondary.card"} color={"gray.800"} rounded="lg" p={5}>
                <form>
                    <Grid
                        gap="2"
                        templateColumns="repeat(8, 1fr)"
                        mb={4}
                    >
                        <GridItem colSpan="2">
                            <Image src={`http://localhost:8080/files/${customer.data.passportUrl}`} />
                        </GridItem>
                        <GridItem colSpan="6">
                            <Stack direction="row" mb={4}>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Input
                                        focusBorderColor="main.500"
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={customer.firstName}
                                        placeholder="First Name"
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                    <Input
                                        focusBorderColor="main.500"
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={customer.lastName}
                                        placeholder="Last Name"
                                        readOnly
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" mb={4}>
                                <FormControl>
                                    <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                                    <Input
                                        focusBorderColor="main.500"
                                        type="text"
                                        name="middleName"
                                        id="middleName"
                                        value={customer.middleName}
                                        placeholder="Middle Name"
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                                    <Input
                                        focusBorderColor="main.500"
                                        type="tel"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={customer.phoneNumber}
                                        placeholder="Phone Number"
                                        readOnly
                                    />
                                </FormControl>
                                {/* <FormControl isRequired>
                                    <FormLabel htmlFor="email">Email Address</FormLabel>
                                    <Input
                                        focusBorderColor="main.500"
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={customer.email}
                                        placeholder="Email"
                                        readOnly
                                    />
                                </FormControl> */}
                            </Stack>
                        </GridItem>
                    </Grid>
                    <Divider />
                    <Heading as="h5" mb={4}>Customer Data</Heading>
                    {customer.data && <>
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    value={dayjs(customer.data.dateOfBirth).format('YYYY-MM-DD')}
                                    placeholder="Date of Birth"
                                    readOnly
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="gender">Gender</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="gender"
                                    id="gender"
                                    value={customer.data.gender}
                                    placeholder="Gender"
                                    readOnly>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Select>
                            </FormControl>
                            {/* <FormControl isRequired>
                                <FormLabel htmlFor="maritalStatus">Marital Status</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="maritalStatus"
                                    id="maritalStatus"
                                    value={customer.data.maritalStatus}
                                    placeholder="Marital Status"
                                    readOnly>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </Select>
                            </FormControl> */}
                        </Stack>
                        {/* <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="hometown">Hometown</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="hometown"
                                    id="hometown"
                                    value={customer.data.hometown}
                                    placeholder="Hometown"
                                    readOnly
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="stateOfOrigin">State of Origin</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="stateOfOrigin"
                                    id="stateOfOrigin"
                                    value={customer.data.stateOfOrigin}
                                    placeholder="State of Origin"
                                    readOnly
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="email">Local Government Area</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="localGovernmentArea"
                                    id="localGovernmentArea"
                                    value={customer.data.localGovernmentArea}
                                    placeholder="Local Government Area"
                                    readOnly
                                />
                            </FormControl>
                        </Stack> 
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="address">Residential Address</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={customer.data.address}
                                    placeholder="Address"
                                    readOnly
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="city">City</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={customer.data.city}
                                    placeholder="City"
                                    readOnly
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="state">State of Residence</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    name="state"
                                    type="text"
                                    id="state"
                                    value={customer.data.state}
                                    placeholder="State"
                                    readOnly
                                />
                            </FormControl>
                        </Stack>*/}
                    </>}
                    <Divider />
                    <Heading as="h5" mb={4}>Customer Employment</Heading>
                    {customer.employment && <>
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="staffId">Staff ID (BSN)</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="staffId"
                                    id="staffId"
                                    value={customer.employment.staffId}
                                    placeholder="Staff ID (BSN)"
                                    readOnly
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel htmlFor="mda">MDA</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="mda"
                                    id="mda"
                                    value={customer.employment.mda}
                                    placeholder="MDA"
                                    readOnly
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction="row" mb={4}>
                            {/* <FormControl isRequired>
                                <FormLabel htmlFor="dateOfFirstAppointment">Date of First Appointment</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="date"
                                    name="dateOfFirstAppointment"
                                    id="dateOfFirstAppointment"
                                    value={dayjs(customer.employment.dateOfFirstAppointment).format('YYYY-MM-DD')}
                                    placeholder="Date of First Appointment"
                                    readOnly
                                />
                            </FormControl> */}
                            <FormControl isRequired>
                                <FormLabel htmlFor="salaryGrade">Salary Grade</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="salaryGrade"
                                    id="salaryGrade"
                                    value={customer.employment.gradeLevel}
                                    placeholder="Salary Grade"
                                    readOnly
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="retirementDate">Retirement Date</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="date"
                                    name="retirementDate"
                                    id="retirementDate"
                                    value={dayjs(customer.employment.retirementDate).format('YYYY-MM-DD')}
                                    placeholder="Retirement Date"
                                    readOnly
                                />
                            </FormControl>
                        </Stack></>}
                    <Divider />
                    <Heading as="h5" mb={4}>Customer Payment</Heading>
                    {customer.payment && <>
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="bankName">Bank Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    name="bankName"
                                    type="text"
                                    id="bankName"
                                    value={customer.payment.bankName}
                                    placeholder="Bank Name"
                                    readOnly
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="number"
                                    name="accountNumber"
                                    id="accountNumber"
                                    value={customer.payment.accountNumber}
                                    placeholder="Account Number"
                                    readOnly>
                                </Input>
                            </FormControl>
                        </Stack></>}
                    <Divider />
                    <Heading as="h5" mb={4}>Loan Details</Heading>
                    <Stack direction="row" mb={4}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="amount">Loan Amount</FormLabel>
                            <Input
                                focusBorderColor="main.500"
                                name="amount"
                                type="text"
                                id="amount"
                                value={(200000).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                                placeholder="Loan Amount"
                                readOnly
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="deductions">Deductions Made</FormLabel>
                            <Input
                                focusBorderColor="main.500"
                                name="deductions"
                                type="text"
                                id="deductions"
                                value={(50000).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                                placeholder="Deductions Made"
                                readOnly
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="tenure">Tenure</FormLabel>
                            <Input
                                focusBorderColor="main.500"
                                type="text"
                                name="tenure"
                                id="tenure"
                                value="10 Months"
                                placeholder="Tenure"
                                readOnly>
                            </Input>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" mb={4}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="startDate">Start Date</FormLabel>
                            <Input
                                focusBorderColor="main.500"
                                type="date"
                                name="startDate"
                                id="startDate"
                                value="2020-01-01"
                                placeholder="Start Date"
                                readOnly>
                            </Input>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="endDate">End Date</FormLabel>
                            <Input
                                focusBorderColor="main.500"
                                type="date"
                                name="endDate"
                                id="endDate"
                                value="2020-10-01"
                                placeholder="End Date"
                                readOnly>
                            </Input>
                        </FormControl>
                    </Stack>
                </form>
            </Box>
        </PageContent>
    )
}
