import React from "react";
import { ChakraProvider } from "@chakra-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import theme from "./theme";

import {
  Login,
  PasswordReset,
  PasswordConfirm,
} from "./containers/Auth";

import DashboardLayout from "./containers/Layout/DashboardLayout";

function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <ChakraProvider theme={theme}>
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/reset-password" exact render={() => <PasswordReset />} />
        <Route path="/new-password" exact render={() => <PasswordConfirm />} />
        <Route path="/" render={() => <DashboardLayout />} />
        </ChakraProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
