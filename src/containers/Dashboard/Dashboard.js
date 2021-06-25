import React, { useContext, useEffect, useState } from "react";
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Stack,
  Text,
  Flex,
  Icon,
  Badge,
  useToast,
} from "@chakra-ui/core";

import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { PageContent, Card } from "../Layout";

import "./Dashboard.scss";
import toCurrency from "../../helpers/toCurrency";
import { useHistory } from "react-router-dom";
import { UserStateContext } from "../../contexts/UserContext";
import { getCall } from "../../helpers/apiCall";
import { Table, Th, Thead } from "@chakra-ui/react";
import Applications from "../Application/Applications";

export default function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const toast = useToast();
  const user = useContext(UserStateContext);

  console.log({user});

  useEffect(() => {
    if (user.firstName !== "") {
      getCall("application/view-all", user.token).then(res => {
        console.log(res);
        setApplications(res.data);
        setLoading(false);
      }, err => {
        toast({ status: "error", title: err.message });
      })
    }
  }, [user, toast]);

  const pendingApplications = applications.filter(curr => !curr.loan);
  const activeLoans = applications.filter(curr => curr.loan);
  const loanValue = activeLoans.reduce((total, curr) => total + curr.loan.totalLoan, 0);

  if (loading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>

    )
  }
  return (
    <PageContent
      title="Dashboard"
      primaryAction={{
        content: "New Customer",
        onClick: () => {
          history.push('/new-customer');
        },
      }}
      secondaryActions={[
        {
          content: "View All Applications",
          onClick: () => {
            history.push('/applications');
          },
        },
      ]}
    >
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} mb={4}>
        <Card
          title="Active Loan Value"
          bg="main.500"
          color="white"
        // filterActions={[
        //   {
        //     default: "2_weeks",
        //     items: {
        //       "1_week": "Last week",
        //       "2_weeks": "Last 14 days",
        //       "30_days": "30 Days",
        //     },

        //     onChange: () => {
        //       alert("ok");
        //     },
        //   },
        // ]}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="3em" lineHeight="4rem" fontWeight="700">
              {toCurrency(loanValue, "NGN")}
            </Text>
            {/* <Stack alignItems="center">
              <Icon as={FaChevronUp} color="gray.100" fontSize="2em" />
              <Badge colorScheme="green">+2.5%</Badge>
            </Stack> */}
          </Flex>
        </Card>
        <Card title="Pending Applications" bg="main.500" color="white">
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="4em" lineHeight="4rem" fontWeight="700">
              {pendingApplications.length}
            </Text>
            {/* <Stack alignItems="center">
              <Icon as={FaChevronDown} color="gray.100" fontSize="2em" />
              <Badge colorScheme="red">-2.5%</Badge>
            </Stack> */}
          </Flex>
        </Card>
        {/* <Card title="Your Stats">
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
        </Card> */}
      </SimpleGrid>
      <Applications/>
    </PageContent>
  );
}
