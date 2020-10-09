import React, { useState } from "react";
import { ChakraProvider, Box, Select, Text } from "@chakra-ui/core";

import theme from "./theme";

import {
  Login,
  Register,
  PasswordReset,
  PasswordConfirm,
} from "./containers/Auth";

import { Dashboard } from "./containers/Dashboard";

function App() {
  const [preview, setPreview] = useState("sign_in");

  const changePreview = (e) => {
    setPreview(e.target.value);
  };

  const previewComponent = () => {
    let defaultComponent = <Login />;
    switch (preview) {
      case "sign_in":
        defaultComponent = <Login />;
        break;
      case "sign_up":
        defaultComponent = <Register />;
        break;
      case "reset_password_1":
        defaultComponent = <PasswordReset />;
        break;
      case "reset_password_2":
        defaultComponent = <PasswordConfirm />;
        break;
      case "dashboard":
        defaultComponent = <Dashboard />;
        break;
    }
    console.log(preview, defaultComponent);
    return defaultComponent;
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        position="absolute"
        bg="#ffffff"
        borderWidth="1px"
        borderColor="#cccccc"
        bottom="30%"
        p={4}
      >
        <Text fontWeight="500">Preview:</Text>
        <Select onChange={changePreview}>
          <option value="sign_in">Sign in</option>
          <option value="sign_up">Sign up</option>
          <option value="reset_password_1">Reset Password (Step 1)</option>
          <option value="reset_password_2">Reset Password (Step 2)</option>
          <option value="dashboard">Dashboard</option>
        </Select>
      </Box>
      {previewComponent()}
    </ChakraProvider>
  );
}

export default App;
