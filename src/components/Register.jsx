import React, { useEffect } from "react";
import { Box, Typography, Button, TextField, Stack, Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { AlertActions } from "../redux/slices/AlertSlice";
import { Link } from "./ui/Link";

function Register() {
    useEffect(() => {
        document.title = process.env.REACT_APP_BRAND_NAME + " Registration"
    }, [])

    const dispatch = useDispatch()
    const alert = useSelector(data => data.Alert.register)

    const validation = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'First name must be at least 2 characters long.')
            .max(30, 'First name must be less than 30 characters long.')
            .required('First name is required.'),
        email: Yup.string()
            .email('Incorrect email format.')
            .required('Email is required.'),
        password: Yup.string()
            .min(8, 'Password must be 8 characters long.')
            .max(30, 'Password must be 30 characters long.')
            .required('Password is required.'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required.'),
    });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack width="100%" spacing={3} p={1} mt={3} maxWidth="600px">
            <Typography textAlign="center" variant="h4">Registration</Typography>
            <Stack p={2} spacing={2}>
                <Collapse in={!!alert.value}>
                    <Alert
                        severity={alert.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    dispatch(AlertActions.clearRegister())
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
                        firstName: "",
                        email: "",
                        password: "",
                        password2: ""
                    }}
                    onSubmit={(data) => {
                        AuthService.register(data).then(() => {
                            dispatch(AlertActions.setSuccessRegister(`Check your email ${data.email} for confirmation link`))
                        }).catch(({response}) => {
                            console.log(response)
                            if (response.data.message)
                            {
                                dispatch(AlertActions.setErrorRegister(response.data.message))
                                return
                            }

                            if (response.status === 409){
                                dispatch(AlertActions.setErrorRegister('The email is already registered'))
                                return
                            }

                            dispatch(AlertActions.setErrorRegister('Unknown error'))
                        })
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Stack spacing={2}>
                                <Field
                                    name="firstName"
                                    label="First name"
                                    as={TextField}
                                    error={errors.firstName && touched.firstName}
                                    helperText={touched.firstName ? errors.firstName : ''}
                                    maxLength="30"
                                />
                                <Field
                                    name="email"
                                    label="Email"
                                    type="email"
                                    as={TextField}
                                    error={errors.email && touched.email}
                                    helperText={touched.email ? errors.email : ''}
                                    maxLength="60"
                                />
                                <Field
                                    name="password"
                                    label="Password"
                                    type="password"
                                    as={TextField}
                                    error={errors.password && touched.password}
                                    helperText={touched.password ? errors.password : ''}
                                    maxLength="60"
                                />
                                <Field
                                    name="password2"
                                    label="Password confirmation"
                                    type="password"
                                    as={TextField}
                                    error={errors.password2 && touched.password2}
                                    helperText={touched.password2 ? errors.password2 : ''}
                                    maxLength="60"
                                />
                                <Button type="submit" variant="contained" size="large">Register</Button>
                            </Stack>

                        </Form>
                    )}
                </Formik>
            </Stack>
            <Typography textAlign="center" variant="h6">If you already have account, you can <Link to="/login">login</Link></Typography>
        </Stack>
        </Box>
    )
}

export default Register