import React, { useState } from "react";
import {
  Box,
  Text,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  FormLabel,
  Checkbox,
  Link,
  Button,
  Divider,
  FormControl,
  Heading,
} from "@chakra-ui/core";

import { FaRegEnvelope, FaLock } from "react-icons/fa";

import { PageContainer, Footer } from "../Layout";

import "./Login.scss";

export default function Login() {
  const [isSubmitting, setSubmitting] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Demo: Submit login form
    setSubmitting(true);
    setTimeout(function () {
      setSubmitting(false);
    }, 700);
    // End demo
  };
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
                  placeholder="name@example.com"
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
                  placeholder="Enter your password"
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack justifyContent="space-between" isInline marginBottom="1rem">
            <Stack isInline>
              <Checkbox
                size="md"
                fontWeight="500"
                colorScheme="main"
                name="remember_me"
                id="remember_me"
              >
                Remember me
              </Checkbox>
            </Stack>
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
        <Divider marginBottom="1rem" />
        <Stack>
          <Text textAlign="center" fontWeight="500">
            Don't have an account?
          </Text>
          <Button colorScheme="main" variant="outline">
            Sign up
          </Button>
        </Stack>
      </Box>
      <Footer />
    </PageContainer>
  );
}
