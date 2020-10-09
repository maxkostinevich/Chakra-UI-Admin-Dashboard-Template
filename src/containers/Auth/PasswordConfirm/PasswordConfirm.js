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
  Divider,
  FormControl,
  Heading,
} from "@chakra-ui/core";

import { FaRegEnvelope, FaLock } from "react-icons/fa";

import { PageContainer, Footer } from "../Layout";

import "./PasswordConfirm.scss";

export default function PasswordConfirm() {
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
        <Heading marginBottom="1.5rem">Reset password</Heading>
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
                <FormLabel htmlFor="password">New Password</FormLabel>
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
                  placeholder="Enter your new password"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Stack justifyContent="space-between" isInline>
                <FormLabel htmlFor="password2">Confirm New Password</FormLabel>
              </Stack>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaLock} color="secondary.inputHelper" />}
                />
                <Input
                  focusBorderColor="main.500"
                  name="password2"
                  id="password2"
                  type="password"
                  placeholder="Confirm your new password"
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
              Reset password
            </Button>
          </Stack>
        </form>
        <Divider marginBottom="1rem" />
        <Stack>
          <Link
            href="#"
            textAlign="center"
            color="secondary.link"
            fontSize="sm"
            fontWeight="500"
          >
            Back to Sign in
          </Link>
        </Stack>
      </Box>
      <Footer />
    </PageContainer>
  );
}
