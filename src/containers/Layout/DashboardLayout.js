import jwtDecode from "jwt-decode";
import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { UserDispatchContext } from "../../contexts/UserContext";
import Customer from "../Customer/Customer";
import { Dashboard } from "../Dashboard";
import { NewCustomer } from "../NewCustomer";
import NewCustomerData from "../NewCustomer/NewCustomerData";
import NewCustomerEmployment from "../NewCustomer/NewCustomerEmployment";
import NewCustomerPayment from "../NewCustomer/NewCustomerPayment";
import Footer from "./Footer";
import Nav from "./Nav";
import PageContainer from "./PageContainer";
import Customers from "../Customer/Customers";
import NewCustomerPassport from "../NewCustomer/NewCustomerPassport";
import NewApplication from "../NewApplication/NewApplication";
import NewGuarantor from "../NewApplication/NewGuarantor";
import FileUploads from "../NewApplication/FileUploads";
import Applications from "../Application/Applications";
import Application from "../Application/Application";
import AdminUsers from "../AdminUsers/AdminUsers";
import NewAdminUser from "../AdminUsers/NewAdminUser";
import ActivateAdmin from "../AdminUsers/ActivateAdmin";
import Loans from "../Loans/Loans";
import ActiveLoans from "../Loans/ActiveLoans";
import LoanArchive from "../Loans/LoanArchive";
import Loan from "../Loans/Loan";

const localUser = window.localStorage.getItem("user");
let parsedUser;
if (localUser) {
  parsedUser = JSON.parse(localUser);
}
let user;
if (parsedUser) {
  const decodedUser = jwtDecode(parsedUser.data.token);
  if (decodedUser.exp < Date.now() / 1000) {
    window.localStorage.removeItem("user");
  } else {
    user = parsedUser.data;
  }
}

export default function DashboardLayout() {
  const UserDispatch = useContext(UserDispatchContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      UserDispatch(user);
    } else {
      history.push("/login");
    }
  }, [UserDispatch, history]);

  return (
    <PageContainer isFixedNav>
      <Nav />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/admin-users" component={AdminUsers} />
        <Route exact path="/new-admin-user" component={NewAdminUser} />
        <Route exact path="/activate-admin/:email" component={ActivateAdmin} />
        <Route exact path="/customers/" component={Customers} />
        <Route exact path="/customers/:id" component={Customer} />
        <Route exact path="/new-customer" component={NewCustomer} />
        <Route
          exact
          path="/new-customer-data/:id"
          component={NewCustomerData}
        />
        <Route
          exact
          path="/new-customer-passport/:id"
          component={NewCustomerPassport}
        />
        <Route
          exact
          path="/new-customer-employment/:id"
          component={NewCustomerEmployment}
        />
        <Route
          exact
          path="/new-customer-payment/:id"
          component={NewCustomerPayment}
        />
        <Route exact path="/applications" component={Applications} />
        <Route exact path="/applications/:id" component={Application} />
        <Route
          exact
          path="/customers/:id/new-application"
          component={NewApplication}
        />
        <Route
          exact
          path="/new-application-guarantor/:id"
          component={NewGuarantor}
        />
        <Route
          exact
          path="/new-application-uploads/:id"
          component={FileUploads}
        />
        <Route
          exact
          path="/loans/"
          component={Loans}
        />
        <Route
          exact
          path="/loans/active"
          component={ActiveLoans}
        />
        <Route
          exact
          path="/loans/completed"
          component={LoanArchive}
        />
        <Route
          exact
          path="/loans/:id"
          component={Loan}
        />
      </Switch>
      <Footer />
    </PageContainer>
  );
}
