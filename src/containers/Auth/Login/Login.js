import React, { useState } from "react";
import {
  Box,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  FormLabel,
  Link,
  Button,
  FormControl,
  Heading,
} from "@chakra-ui/core";
import { authCall } from "../../../helpers/apiCall";
import { useHistory } from "react-router-dom"

import { FaRegEnvelope, FaLock } from "react-icons/fa";

import { PageContainer } from "../Layout";

import "./Login.scss";

export default function Login() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  })
  const history = useHistory()
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    authCall("admin/auth/login", formDetails).then(res => {
      window.localStorage.setItem("user", JSON.stringify(res));
      history.push("/")
    })
  };

  const handleChange = (e, name) => {
    e.persist();
    setFormDetails(prev => {
      return { ...prev, [name]: e.target.value }
    });
  }
  return (
    <PageContainer>
      <Box
        width={{ base: "90%", md: "400px" }}
        bg="secondary.card"
        rounded="lg"
        p={5}
      >
        <Heading marginBottom="1.5rem">Sign in</Heading>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4} marginBottom="1rem">
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Icon as={FaRegEnvelope} color="secondary.inputHelper" />
                  }
                />
                <Input
                  focusBorderColor="main.500"
                  type="email"
                  name="email"
                  id="email"
                  value={formDetails.email}
                  placeholder="Email"
                  onChange={(e) => handleChange(e, "email")}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Stack justifyContent="space-between" isInline>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  href="#"
                  color="secondary.link"
                  fontSize="sm"
                  fontWeight="500"
                >
                  Forgot Password?
                </Link>
              </Stack>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaLock} color="secondary.inputHelper" />}
                />
                <Input
                  focusBorderColor="main.500"
                  name="password"
                  id="password"
                  type="password"
                  value={formDetails.value}
                  placeholder="Password"
                  onChange={(e) => handleChange(e, "password")}
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack marginBottom="1rem">
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Please wait.."
              colorScheme="main"
            >
              Sign in
            </Button>
          </Stack>
        </form>
      </Box>
    </PageContainer>
  );
}
