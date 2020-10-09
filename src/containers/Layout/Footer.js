import React from "react";
import { Container, Stack, Link, Text } from "@chakra-ui/core";

import "./Layout.scss";

export default function Footer() {
  return (
    <Container
      maxW="lg"
      marginTop="auto"
      paddingTop="1.5rem"
      paddingBottom="1.5rem"
    >
      <Stack
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack isInline fontWeight="500" fontSize="sm">
          <Text color="secondary.link">&copy; 2020</Text>
          <Link href="#" color="secondary.link" fontWeight="bold">
            Awesome App
          </Link>
          <Text color="secondary.link">&mdash; All rights reserved</Text>
        </Stack>
        <Stack isInline fontWeight="500" fontSize="sm">
          <Link className="footer-nav-item" href="#" color="secondary.link">
            Terms
          </Link>
          <Link className="footer-nav-item" href="#" color="secondary.link">
            Privacy Policy
          </Link>
          <Link className="footer-nav-item" href="#" color="secondary.link">
            Contact Us
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
