import { useToast } from "@chakra-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getCall } from "../../helpers/apiCall";
import UserContext from "../../contexts/UserContext";
import { PageContent, Table } from "../Layout";

export default function Customers() {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const { user } = useContext(UserContext);
    const toast = useToast();

    useEffect(() => {
        if (user.firstName !== "") {
            getCall("customer", user.token).then(res => {
                console.log(res);
                setCustomers(res.data);
                setLoading(false);
            }, err => {
                toast({ status: "error", title: err.message });
            })
        }
    }, [user, toast])
    let headers = [
        {
            id: "sno",
            title: "S/No",
        },
        {
            id: "firstName",
            title: "First Name",
        },
        {
            id: "lastName",
            title: "Last Name",
        },
        {
            id: "email",
            title: "Email",
        },
        {
            id: "phoneNumber",
            title: "Phone Number",
        },
        {
            id: "createdAt",
            title: "Date registered",
        },
    ];

    let users = customers.map((c, i) => ({
        sno: i + 1,
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        phoneNumber: c.phoneNumber,
        createdAt: new Date(c.created).toLocaleDateString("en-NG")
    }))

    if (loading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>

        )
    } else {
        return (
            <PageContent
                title="Users"
                primaryAction={{
                    content: "Add user",
                    onClick: () => {
                        alert("ok");
                    },
                }}
            >
                <Table headers={headers} items={users} />
            </PageContent>
        );
    }
}
