import React from "react";
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/core";

import { PageContainer, PageContent, Nav, Footer, Card } from "../Layout";

import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <PageContainer isFixedNav>
      <Nav />
      <PageContent
        title="Dashboard"
        primaryAction={{
          content: "Create report",
          onClick: () => {
            alert("ok");
          },
        }}
        secondaryActions={[
          {
            content: "Second action",
            onClick: () => {
              alert("ok");
            },
          },
          {
            content: "Third action",
            onClick: () => {
              alert("ok");
            },
          },
        ]}
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          <Card
            title="Card Title"
            subtitle="Card subtitle"
            primaryAction={{
              content: "Create report",
              onClick: () => {
                alert("ok");
              },
            }}
            secondaryActions={[
              {
                content: "Second action",
                onClick: () => {
                  alert("ok");
                },
              },
            ]}
          >
            Card Content
          </Card>
          <Card title="Your Stats">
            <StatGroup justifyContent="space-between">
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  9.05%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Sold</StatLabel>
                <StatNumber>$1,500</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  29.13%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Card>
        </SimpleGrid>
      </PageContent>
      <Footer />
    </PageContainer>
  );
}
