import React from "react";
import { Flex } from "@chakra-ui/react";

import "./Layout.scss";

export default function PageContainer(props) {
  return (
    <Flex
      bg="secondary.background"
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {props.children}
    </Flex>
  );
}
