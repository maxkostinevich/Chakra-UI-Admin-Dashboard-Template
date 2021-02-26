import { FormLabel, FormControl, Input, Grid, GridItem, Image, Select, Divider, Heading, Box, Button, Textarea, useToast } from '@chakra-ui/core';
import { Stack } from '@chakra-ui/core';
import dayjs from 'dayjs';
// import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { getCall, postCall } from '../../helpers/apiCall';
import createSchedule from '../../helpers/schedule';
import { PageContent } from '../Layout'

export default function Application(props) {
    const { id } = props.match.params;
    const { user } = useContext(UseUserContext);
    const [application, setApplication] = useState({})
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showApproval, setShowApproval] = useState(null);
    const [approval, setApproval] = useState({
        status: "",
        note: "",
        commencementDate: ""
    })
    const history = useHistory();
    const toast = useToast();
    useEffect(() => {
        if (user.firstName !== "") {
            getCall(`application/view/${id}`, user.token).then(res => {
                console.log(res);
                setApplication(res.data);
                setLoading(false);
            }, err => { console.log(err) })
        }
    }, [user, id])

    const handleApproval = (e) => {
        setIsSubmitting(true)
        e.preventDefault();
        let body = approval;
        if(showApproval === "manager" && approval.status) {
            const totalLoan = application.amount + (application.interestRate * application.amount / 100);
            body = {
                ...approval,
                endDate: dayjs(approval.commencementDate).add(application.tenure, 'months'),
                totalLoan,
                schedule: createSchedule(application.tenure, totalLoan, approval.commencementDate)
            }
            console.log(body);
        }
        postCall(`application/${id}/${showApproval}`, body, user.token).then(res => {
            toast({ status: 'success', title: res.message })
            setIsSubmitting(false);
            history.push(`/applications`)
        }, err => {
            toast({ status: 'error', title: err.message });
            setIsSubmitting(false);
        })
    }

    const handleChange = (e, name) => {
        e.persist();
        setApproval(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    if (loading) {
        return (<PageContent>
            <Heading as="h3">Loading...</Heading>
        </PageContent>)
    }

    const { customer, guarantor } = application;
    return (
        <PageContent
            title={customer.firstName + " " + customer.lastName}
            primaryAction={!application.lineManagerApproval && user.role === "lineManager" ? {
                content: "Line Manager Approval",
                onClick: () => {
                    setShowApproval("lineManager");
                }
            } : null}
            secondaryActions={application.lineManagerApproval && !application.managerApproval && user.role === "manager" ? [
                {
                    content: "Manager Approval",
                    onClick: () => {
                        setShowApproval("manager");
                    }
                }
            ] : null}
        >
            <Box width="100%" bg={"secondary.card"} color={"gray.800"} rounded="lg" p={5}>
                {showApproval && <Box>
                    <form onSubmit={(e) => handleApproval(e)}>
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="approvalStatus">Approval Status</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="approvalStatus"
                                    id="approvalStatus"
                                    value={approval.status}
                                    onChange={(e) => handleChange(e, 'status')}
                                    placeholder="Approval Status"
                                >
                                    <option value={true}>Approved</option>
                                    <option value={false}>Denied</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="approvalNotes">Approval Notes</FormLabel>
                                <Textarea
                                    focusBorderColor="main.500"
                                    name="approvalNotes"
                                    id="approvalNotes"
                                    value={approval.note}
                                    onChange={(e) => handleChange(e, 'note')}
                                    placeholder="Notes"
                                />
                            </FormControl>
                            {showApproval === "manager" ? <>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="commencementDate">Commencement Date</FormLabel>
                                    <Input
                                        focusBorderColor="main.500"
                                        type="date"
                                        name="commencementDate"
                                        id="commencementDate"
                                        value={approval.commencementDate}
                                        onChange={(e) => handleChange(e, 'commencementDate')}
                                        placeholder="Commencement Date"
                                    />
                                </FormControl>
                            </> : null}
                        </Stack>
                        <Stack marginBottom="1rem">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>}
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
                            </Stack>
                        </GridItem>
                    </Grid>
                    <Divider />
                    <Heading as="h5" mb={4}>Applicant Data</Heading>
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

                        </Stack>
                    </>}
                    <Divider />
                    <Heading as="h5" mb={4}>Applicant Employment</Heading>
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
                    <Heading as="h5" mb={4}>Applicant Payment</Heading>
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
                    <Heading as="h5" mb={4}>Loan Documents</Heading>
                    <Stack direction="row" wrap="wrap" mb={4}>
                        <Button as="a" target="_blank" href={`http://localhost:8080/documents/${application.firstAppointmentLetter}`} mb={4} disabled={application.firstAppointmentLetter ? false : true} colorScheme="main">
                            First Appointment Letter
                        </Button>
                        <Button as="a" target="_blank" href={`http://localhost:8080/documents/${application.confirmationLetter}`} mb={4} disabled={application.confirmationLetter ? false : true} colorScheme="main">
                            Confirmation Letter
                        </Button>
                        <Button as="a" target="_blank" href={`http://localhost:8080/documents/${application.lastPaySlip}`} mb={4} disabled={application.lastPaySlip ? false : true} colorScheme="main">
                            Last Pay Slip
                        </Button>
                        <Button as="a" target="_blank" href={`http://localhost:8080/documents/${application.verificationPrintout}`} mb={4} disabled={application.verificationPrintout ? false : true} colorScheme="main">
                            Verification Printout
                        </Button>
                        <Button as="a" target="_blank" href={`http://localhost:8080/documents/${application.letterOfIntroduction}`} mb={4} disabled={application.letterOfIntroduction ? false : true} colorScheme="main">
                            Letter of Introduction
                        </Button>
                    </Stack>
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
                                value={(application.amount).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                                placeholder="Loan Amount"
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
                                value={`${application.tenure} Months`}
                                placeholder="Tenure"
                                readOnly>
                            </Input>
                        </FormControl>
                    </Stack>
                    {application.loan && <Stack direction="row" mb={4}>
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
                    </Stack>}
                    <Divider />
                    <Heading as="h5" mb={4}>Guarantor Details</Heading>
                    {application.guarantor && <>
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={guarantor.firstName}
                                    placeholder="First Name"
                                    readOnly>
                                </Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={guarantor.lastName}
                                    placeholder="Last Name"
                                    readOnly>
                                </Input>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={guarantor.phoneNumber}
                                    placeholder="Phone Number"
                                    readOnly>
                                </Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="placeOfWork">Place of Work</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="placeOfWork"
                                    id="placeOfWork"
                                    value={guarantor.placeOfWork}
                                    placeholder="Place of Work"
                                    readOnly>
                                </Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="designation">Designation</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="designation"
                                    id="designation"
                                    value={guarantor.designation}
                                    placeholder="Designation"
                                    readOnly>
                                </Input>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" mb={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={guarantor.address}
                                    placeholder="Address"
                                    readOnly>
                                </Input>
                            </FormControl>
                        </Stack>
                    </>}
                </form>
            </Box>
        </PageContent>
    )
}
