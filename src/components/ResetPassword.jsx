import React, { useEffect } from "react";
import { Box, Typography, Button, TextField, Stack, Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { AlertActions } from "../redux/slices/AlertSlice";
import { Link } from "./ui/Link";

function ResetPassword() {
    useEffect(() => {
        document.title = process.env.REACT_APP_BRAND_NAME + " Reset password"
    }, [])

    const dispatch = useDispatch()
    const alert = useSelector(data => data.Alert.password)

    const validation = Yup.object().shape({
        email: Yup.string()
            .email('Incorrect email format.')
            .required('Email is required.')
    });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack width="100%" spacing={3} p={1} mt={3} maxWidth="600px">
                <Typography textAlign="left" paragraph><Link to="/login">← Back</Link></Typography>
                <Typography textAlign="center" variant="h4">Reset password</Typography>
                <Stack spacing={1}>
                    <Collapse in={!!alert.value}>
                        <Alert
                            severity={alert.severity}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        dispatch(AlertActions.clearPassword())
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            <AlertTitle>{alert.title}</AlertTitle>
                            {alert.value}
                        </Alert>
                    </Collapse>
                    <Formik
                        validationSchema={validation}
                        initialValues={{
                            email: ""
                        }}
                        onSubmit={(data) => {
                            AuthService.resetPassword(data.email).then(() => {
                                dispatch(AlertActions.setSuccessPassword(`Check your email ${data.email} for reset password link`))
                            }).catch(({ response }) => {
                                if (response.data.message) {
                                    dispatch(AlertActions.setErrorPassword(response.data.message))
                                    return
                                }

                                if (response.status === 404) {
                                    dispatch(AlertActions.setErrorPassword('Incorrect email or password'))
                                    return
                                }

                                dispatch(AlertActions.setErrorPassword('Unknown error'))
                            })
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Stack spacing={2}>
                                    <Field
                                        name="email"
                                        label="Email"
                                        type="email"
                                        as={TextField}
                                        error={errors.email && touched.email}
                                        helperText={touched.email ? errors.email : ''}
                                        maxLength="60"
                                    />
                                    <Button type="submit" variant="contained" size="large">Send link</Button>
                                </Stack>

                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ResetPassword