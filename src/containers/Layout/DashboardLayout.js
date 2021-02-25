import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import UseUserContext from '../../contexts/UserContext'
import Customer from '../Customer/Customer'
import { Dashboard } from '../Dashboard'
import { NewCustomer } from '../NewCustomer'
import NewCustomerData from '../NewCustomer/NewCustomerData'
import NewCustomerEmployment from '../NewCustomer/NewCustomerEmployment'
import NewCustomerPayment from '../NewCustomer/NewCustomerPayment'
import Footer from './Footer'
import Nav from './Nav'
import PageContainer from './PageContainer'
import Customers from '../Customer/Customers'
import NewCustomerPassport from '../NewCustomer/NewCustomerPassport'
import NewApplication from '../NewApplication/NewApplication'
import NewGuarantor from '../NewApplication/NewGuarantor'
import FileUploads from '../NewApplication/FileUploads'
import Applications from '../Application/Applications'
import Application from '../Application/Application'
import AdminUsers from '../AdminUsers/AdminUsers'
import NewAdminUser from '../AdminUsers/NewAdminUser'
import ActivateAdmin from '../AdminUsers/ActivateAdmin'

export default function DashboardLayout() {
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "",
        id: "",
        status: "",
        token: ""
    });

    const history = useHistory();
    const localUser = window.localStorage.getItem("user");
    let parsedUser;
    if (localUser) {
        parsedUser = JSON.parse(localUser);
    }

    const checkAuthentication = () => {
        if (localUser) {
            const decodedUser = jwtDecode(parsedUser.data.token);
            if (decodedUser.exp < Date.now() / 1000) {
                window.localStorage.removeItem('user');
                return false
            } else {
                return true
            }
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (checkAuthentication()) {
            setUser(parsedUser.data);
        } else {
            history.push("/login");
        }
    }, [])

    return (
        <PageContainer isFixedNav>
            <UseUserContext.Provider value={{ user, setUser }}>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/admin-users" component={AdminUsers} />
                    <Route exact path="/new-admin-user" component={NewAdminUser} />
                    <Route exact path="/activate-admin/:email" component={ActivateAdmin} />
                    <Route exact path="/customers/" component={Customers} />
                    <Route exact path="/customers/:id" component={Customer} />
                    <Route exact path="/new-customer" component={NewCustomer} />
                    <Route exact path="/new-customer-data/:id" component={NewCustomerData} />
                    <Route exact path="/new-customer-passport/:id" component={NewCustomerPassport} />
                    <Route exact path="/new-customer-employment/:id" component={NewCustomerEmployment} />
                    <Route exact path="/new-customer-payment/:id" component={NewCustomerPayment} />
                    <Route exact path="/applications" component={Applications} />
                    <Route exact path="/applications/:id" component={Application} />
                    <Route exact path="/customers/:id/new-application" component={NewApplication} />
                    <Route exact path="/new-application-guarantor/:id" component={NewGuarantor} />
                    <Route exact path="/new-application-uploads/:id" component={FileUploads} />
                </Switch>
                <Footer />
            </UseUserContext.Provider>
        </PageContainer>
    )
}
