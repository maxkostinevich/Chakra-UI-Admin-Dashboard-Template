import React, { useState } from "react";
import {
  Box,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  FormLabel,
  FormHelperText,
  Link,
  Button,
  Divider,
  FormControl,
  Heading,
} from "@chakra-ui/core";

import { FaRegEnvelope } from "react-icons/fa";

import { PageContainer, Footer } from "../Layout";

import "./PasswordReset.scss";

export default function PasswordReset() {
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
              <FormHelperText fontWeight="500">
                We'll email you a link to reset your password
              </FormHelperText>
            </FormControl>
          </Stack>
          <Stack marginBottom="1rem">
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Please wait.."
              colorScheme="main"
            >
              Request reset link
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
