import React from "react";
import { Stack, Link, Text } from "@chakra-ui/react";

import "./Layout.scss";

export default function Footer() {
  return (
    <>
      <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="sm">
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
      <Stack isInline marginTop="1rem" fontWeight="500" fontSize="sm">
        <Text color="secondary.link">&copy; 2020</Text>
        <Link href="#" color="secondary.link" fontWeight="bold">
          Awesome App
        </Link>
        <Text color="secondary.link">&mdash; All rights reserved</Text>
      </Stack>
    </>
  );
}
