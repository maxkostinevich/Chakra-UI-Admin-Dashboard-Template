import {
  Box,
  Grid,
  GridItem,
  Image,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Heading,
} from "@chakra-ui/core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import cogoToast from "cogo-toast";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../contexts/UserContext";
import { getCall } from "../../helpers/apiCall";
import toCurrency from "../../helpers/toCurrency";
import { PageContent } from "../Layout";

export default function Loan(props) {
  const { id } = props.match.params;
  const user = useContext(UserStateContext);
  const [loan, setLoan] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCall(`loan/${id}`, user.token).then((res) => {
      console.log(res);
      setLoan(res.data);
      setLoading(false);
      cogoToast.success(res.message);
    });
  }, [user, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const {
    application: { customer, tenure, interestRate, amount },
    schedule,
    commencementDate,
    endDate,
  } = loan;
  const balance = schedule
    .filter((s) => !s.paymentStatus)
    .reduce((acc, cur) => acc + cur.amount, 0);
  return (
    <PageContent
      title={`${loan.application.customer.firstName} ${loan.application.customer.lastName}`}
    >
      <Box
        width="100%"
        bg={"secondary.card"}
        color={"gray.800"}
        rounded="lg"
        p={5}
      >
        <form>
          <Grid gap="2" templateColumns="repeat(8, 1fr)" mb={4}>
            <GridItem colSpan="2">
              <Image
                src={`http://localhost:8080/files/${customer.data.passportUrl}`}
                width="200px"
                height="180px"
                alt="Passport Photograph"
                objectFit="cover"
              />
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
          <Heading as="h5" mb={4} mt={4}>
            Loan Details
          </Heading>
          <Stack direction="row" mb={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="amount">Loan Amount</FormLabel>
              <Input
                focusBorderColor="main.500"
                name="amount"
                type="text"
                id="amount"
                value={amount.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
                placeholder="Loan Amount"
                readOnly
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="interest">Interest</FormLabel>
              <Input
                focusBorderColor="main.500"
                name="interest"
                type="text"
                id="interest"
                value={(
                  ((amount * interestRate) / 100) *
                  tenure
                ).toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
                placeholder="Interest"
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
                value={`${tenure} Months`}
                placeholder="Tenure"
                readOnly
              ></Input>
            </FormControl>
          </Stack>
          <Stack direction="row" mt={4} mb={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="deductions">Loan Balance</FormLabel>
              <Input
                focusBorderColor="main.500"
                name="deductions"
                type="text"
                id="deductions"
                value={balance.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
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
                value={dayjs(commencementDate).format("YYYY-MM-DD")}
                placeholder="Start Date"
                readOnly
              ></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="endDate">End Date</FormLabel>
              <Input
                focusBorderColor="main.500"
                type="date"
                name="endDate"
                id="endDate"
                value={dayjs(endDate).format("YYYY-MM-DD")}
                placeholder="End Date"
                readOnly
              ></Input>
            </FormControl>
          </Stack>
          <Table className="chakra-ui-table">
                <Thead>
                  <Tr>
                    <Th>Month</Th>
                    <Th>Year</Th>
                    <Th>Amount</Th>
                    <Th>Payment Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {schedule.map((sc, i) => (
                    <Tr key={i}>
                      <Td>{sc.month}</Td>
                      <Td>{sc.year}</Td>
                      <Td>{toCurrency(sc.amount, "NGN")}</Td>
                      <Td>{sc.paymentStatus ? "Paid" : "Pending"}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
          <Divider />
          <Heading as="h5" mb={4} mt={4}>
            Applicant Employment
          </Heading>
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
                value={dayjs(customer.employment.retirementDate).format(
                  "YYYY-MM-DD"
                )}
                placeholder="Retirement Date"
                readOnly
              />
            </FormControl>
          </Stack>
        </form>
      </Box>
    </PageContent>
  );
}
