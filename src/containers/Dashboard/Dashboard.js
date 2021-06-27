import React, { useContext, useEffect, useState } from "react";
import {
  SimpleGrid,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/core";

import { PageContent, Card } from "../Layout";

import "./Dashboard.scss";
import toCurrency from "../../helpers/toCurrency";
import { useHistory } from "react-router-dom";
import { UserStateContext } from "../../contexts/UserContext";
import { getCall } from "../../helpers/apiCall";
import Applications from "../Application/Applications";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const toast = useToast();
  const user = useContext(UserStateContext);

  useEffect(() => {
    if (user.firstName !== "") {
      getCall("application/view-all", user.token).then(
        (res) => {
          setApplications(res.data);
          setLoading(false);
        },
        (err) => {
          toast({ status: "error", title: err.message });
        }
      );
    }
  }, [user, toast]);

  console.log({ applications });
  const pendingApplications = applications.filter((curr) => !curr.loan);
  const activeLoans = applications.filter((curr) => curr.managerApproval);
  const loanValue = activeLoans.reduce(
    (total, curr) => total + curr.loan.totalLoan,
    0
  );

  if (loading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <PageContent
      title="Dashboard"
      primaryAction={{
        content: "New Customer",
        onClick: () => {
          history.push("/new-customer");
        },
      }}
      secondaryActions={[
        {
          content: "View All Applications",
          onClick: () => {
            history.push("/applications");
          },
        },
      ]}
    >
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} mb={4}>
        <Card
          title="Active Loan Value"
          bg="main.500"
          color="white"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="3em" lineHeight="4rem" fontWeight="700">
              {toCurrency(loanValue, "NGN")}
            </Text>
          </Flex>
        </Card>
        <Card title="Pending Applications" bg="main.500" color="white">
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="4em" lineHeight="4rem" fontWeight="700">
              {pendingApplications.length}
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>
      <Applications />
    </PageContent>
  );
}
