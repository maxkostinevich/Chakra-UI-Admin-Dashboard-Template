import { StatLabel } from '@chakra-ui/core';
import { Box, Heading, Stat, StatGroup, StatNumber } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext';
import { getCall } from '../../helpers/apiCall';
import { PageContent } from '../Layout'

export default function Customer(props) {
    const { id } = props.match.params;
    const { user } = useContext(UserContext);
    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user.firstName !== "") {
            getCall(`customer/${id}`, user.token).then(res => {
                console.log(res);
                setCustomer(res.data);
                setLoading(false);
            }, err => { console.log(err) })
        }
    }, [])
    if (loading) {

        return (<PageContent>
            <Heading as="h3">Loading...</Heading>
        </PageContent>)
    }
    return (
        <PageContent
            title={customer.firstName + " " + customer.lastName}
            primaryAction={{
                content: "Edit Customer Data",
                onClick: () => {

                }
            }}
            secondaryActions={[
                {
                    content: "Edit Customer Employment"
                }
            ]}
        >
            <Box width="100%" bg={"secondary.card"} color={"gray.800"} rounded="lg" p={5}>
                <StatGroup>
                    <Stat>
                        <StatLabel>
                            First Name
                        </StatLabel>
                        <StatNumber>
                            {customer.firstName}
                        </StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>
                            Middle Name
                        </StatLabel>
                        <StatNumber>
                            {customer.middleName}
                        </StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>
                            Last Name
                        </StatLabel>
                        <StatNumber>
                            {customer.lastName}
                        </StatNumber>
                    </Stat>
                </StatGroup>
            </Box>
        </PageContent>
    )
}
