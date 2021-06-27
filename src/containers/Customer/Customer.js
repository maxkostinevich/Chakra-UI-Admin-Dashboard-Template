import {
  FormLabel,
  FormControl,
  Input,
  Grid,
  GridItem,
  Image,
  Select,
  Divider,
  Heading,
  Box,
} from "@chakra-ui/core";
import { Stack } from "@chakra-ui/core";
import dayjs from "dayjs";
// import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserStateContext } from "../../contexts/UserContext";
import { getCall } from "../../helpers/apiCall";
import { PageContent } from "../Layout";

export default function Customer(props) {
  const { id } = props.match.params;
  const user = useContext(UserStateContext);
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (user.firstName !== "") {
      getCall(`customer/${id}`, user.token).then(
        (res) => {
          console.log(res);
          setCustomer(res.data);
          setLoading(false);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [user, id]);

  if (loading) {
    return (
      <PageContent>
        <Heading as="h3">Loading...</Heading>
      </PageContent>
    );
  }
  return (
    <PageContent
      title={customer.firstName + " " + customer.lastName}
      primaryAction={{
        content: "New Loan Application",
        onClick: () => {
          history.push(`${id}/new-application`);
        },
      }}
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
                width="200px" height="180px" alt="Passport Photograph" objectFit="cover"
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
          <Heading as="h5" mb={4}>
            Customer Data
          </Heading>
          {customer.data && (
            <>
              <Stack direction="row" mb={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                  <Input
                    focusBorderColor="main.500"
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={dayjs(customer.data.dateOfBirth).format(
                      "YYYY-MM-DD"
                    )}
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
                    readOnly
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </FormControl>
              </Stack>
            </>
          )}
          <Divider />
          <Heading as="h5" mb={4}>
            Customer Employment
          </Heading>
          {customer.employment && (
            <>
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
                  <FormLabel htmlFor="retirementDate">
                    Retirement Date
                  </FormLabel>
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
            </>
          )}
          <Divider />
          <Heading as="h5" mb={4}>
            Customer Payment
          </Heading>
          {customer.payment && (
            <>
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
                    readOnly
                  ></Input>
                </FormControl>
              </Stack>
            </>
          )}
        </form>
      </Box>
    </PageContent>
  );
}
