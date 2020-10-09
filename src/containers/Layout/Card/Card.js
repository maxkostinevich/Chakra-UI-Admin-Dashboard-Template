import React from "react";
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

import "./Card.scss";

export default function Card({
  title = "",
  subtitle = "",
  primaryAction = null,
  secondaryActions = null,
  children,
}) {
  const actions = [
    primaryAction ? (
      <Button
        key="0"
        onClick={primaryAction.onClick}
        colorScheme="main"
        size="sm"
      >
        {primaryAction.content}
      </Button>
    ) : (
      ""
    ),
    secondaryActions
      ? secondaryActions.map((action, i) => (
          <Button
            key={i}
            onClick={action.onClick}
            colorScheme="main"
            variant="outline"
            size="sm"
          >
            {action.content}
          </Button>
        ))
      : "",
  ];

  const header =
    title || subtitle || actions ? (
      <Stack direction="row" alignItems="top" marginBottom="1.5rem">
        <Stack>
          <Heading size="md">{title}</Heading>
          <Heading size="xs" color="gray.500">
            {subtitle}
          </Heading>
        </Stack>
        <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
          {actions}
        </Stack>
      </Stack>
    ) : (
      ""
    );
  return (
    <Box width="100%" bg="secondary.card" rounded="lg" p={5}>
      {header}
      <Box>{children}</Box>
    </Box>
  );
}
