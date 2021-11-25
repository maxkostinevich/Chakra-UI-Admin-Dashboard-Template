import React from "react";
import { Flex } from "@chakra-ui/react";

import "./PageContainer.scss";

export default function PageContainer(props) {
  return (
    <Flex
      bg="secondary.background"
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="top"
      flexDirection="column"
      paddingTop={props.isFixedNav ? { md: "4rem" } : "0"}
    >
      {props.children}
    </Flex>
  );
}
