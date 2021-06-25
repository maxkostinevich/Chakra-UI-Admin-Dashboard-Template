import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import theme from "./theme";

import { Login, PasswordReset, PasswordConfirm } from "./containers/Auth";

import DashboardLayout from "./containers/Layout/DashboardLayout";
import { UserDispatchContext, UserStateContext } from "./contexts/UserContext";

function App() {
  const UserState = UserStateContext;
  const UserDispatch = UserDispatchContext;
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "",
    id: "",
    status: "",
    token: "",
  });
  return (
    <BrowserRouter>
      <Switch>
        <ChakraProvider theme={theme}>
          <UserState.Provider value={user}>
            <UserDispatch.Provider value={setUser}>
              <Route path="/login" exact render={() => <Login />} />
              <Route
                path="/reset-password"
                exact
                render={() => <PasswordReset />}
              />
              <Route
                path="/new-password"
                exact
                render={() => <PasswordConfirm />}
              />
              <Route path="/" render={() => <DashboardLayout />} />
            </UserDispatch.Provider>
          </UserState.Provider>
        </ChakraProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
