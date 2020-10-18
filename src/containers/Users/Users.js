import React from "react";

import { PageContainer, PageContent, Nav, Footer, Table } from "../Layout";

import "./Users.scss";

export default function Users() {
  let headers = [
    {
      id: "id",
      title: "ID",
    },
    {
      id: "name",
      title: "Name",
    },
    {
      id: "email",
      title: "Email",
    },
    {
      id: "date_registered",
      title: "Date registered",
    },
  ];

  let users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      date_registered: "July 15, 2020",
    },
    {
      id: 2,
      email: "john2@example.com",
      name: "John2 Doe",
      date_registered: "July 16, 2020",
    },
    {
      id: 3,
      name: "John3 Doe",
      email: "john3@example.com",
      date_registered: "July 17, 2020",
    },
  ];
  return (
    <PageContainer isFixedNav>
      <Nav />
      <PageContent
        title="Users"
        primaryAction={{
          content: "Add user",
          onClick: () => {
            alert("ok");
          },
        }}
      >
        <Table selectable selected={[2, 3]} headers={headers} items={users} />
      </PageContent>
      <Footer />
    </PageContainer>
  );
}
