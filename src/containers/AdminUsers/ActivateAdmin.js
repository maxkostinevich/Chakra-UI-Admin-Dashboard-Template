import { Box, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/core'
import { useToast} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import UseUserContext from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'

export default function ActivateAdmin(props) {
    const {email} = props.match.params;
    const [formDetails, setFormDetails] = useState({
        email: email,
        password: "",
        passwordResetToken: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const toast = useToast();
    const history = useHistory();
    const {user} = useContext(UseUserContext);

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall(`admin/auth/activate`, formDetails, user.token).then(res => {
            console.log(res);
            toast({status: "success", title: res.message});
            history.push(`/admin-users`);
        }, err => {
            console.log(err);
            setIsSubmitting(false);
            toast({
                title: err.message,
                status: "error"
            })
        })
    };
    return (
        <PageContent
            title="Activate Admin User">
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formDetails.email}
                                    placeholder="Email"
                                    onChange={(e) => handleChange(e, "email")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="password">New Password</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formDetails.password}
                                    placeholder="New Password"
                                    onChange={(e) => handleChange(e, "password")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="passwordResetToken">Activation Token</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="passwordResetToken"
                                    name="passwordResetToken"
                                    id="passwordResetToken"
                                    value={formDetails.passwordResetToken}
                                    placeholder="Activation Token"
                                    onChange={(e) => handleChange(e, "passwordResetToken")}
                                />
                            </FormControl>
                        </Stack>
                        <Stack marginBottom="1rem">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Activate
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </PageContainer>
        </PageContent>
    )
}
