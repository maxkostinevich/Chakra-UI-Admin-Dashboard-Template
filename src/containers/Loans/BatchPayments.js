import React, { useContext, useState } from "react";
import { PageContent } from "../Layout";
import { Stack, FormControl, FormLabel, Input, Button } from "@chakra-ui/core";
import axios from "axios";
import { UserStateContext } from "../../contexts/UserContext";

export default function BatchPayments() {
    const [file, setFile] = useState("");
    const [uploadStatus, setUploadStatus] = useState(false);
    const user = useContext(UserStateContext);

    const handleChange = (e) => {
        e.persist();
        setFile(e.target.files[0]);
    }
    const handleFileUpload = () => {
        const data = new FormData();
        data.append('file', file);
        axios.post("http://localhost:8080/api/loan/batch-upload", data, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.data.response);
            setUploadStatus(true);
        })
    }
  return (
    <PageContent title="Batch Payment">
      {/* <FileUpload name="batchUpload" placeholder="Upload Payment File" isRequired={true}/> */}
      <Stack spacing={4} marginBottom="1rem">
        <FormControl isRequired>
          <FormLabel htmlFor="firstAppointmentLetter">
            First Appointment Letter
          </FormLabel>
          <Input
            focusBorderColor="main.500"
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            name="file"
            id="file"
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <Button
          type="button"
          colorScheme="main"
          onClick={() => handleFileUpload("firstAppointmentLetter")}
          disabled={uploadStatus}
        >
          Upload
        </Button>
      </Stack>
    </PageContent>
  );
}
