import React, { useEffect } from "react";
import { Box, Typography, Button, TextField, Stack, Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { AlertActions } from "../redux/slices/AlertSlice";
import { Link } from "./ui/Link";

function Login() {
    useEffect(() => {
        document.title = process.env.REACT_APP_BRAND_NAME + " Login"
    }, [])

    const dispatch = useDispatch()
    const alert = useSelector(data => data.Alert.login)

    const validation = Yup.object().shape({
        email: Yup.string()
            .email('Incorrect email format.')
            .required('Email is required.'),
        password: Yup.string()
            .required('Password is required.'),
    });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack width="100%" spacing={3} p={1} mt={3} maxWidth="600px">
                <Typography textAlign="center" variant="h4">Login</Typography>
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
                                        dispatch(AlertActions.clearLogin())
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
                            email: "",
                            password: ""
                        }}
                        onSubmit={(data) => {
                            AuthService.login(data).then(({ data: resData }) => {
                                localStorage.setItem('accessToken', JSON.stringify(resData))
                            }).catch(({ response }) => {
                                if (response.data.message) {
                                    dispatch(AlertActions.setErrorLogin(response.data.message))
                                    return
                                }

                                if (response.status === 404) {
                                    dispatch(AlertActions.setErrorLogin('Incorrect email or password'))
                                    return
                                }

                                dispatch(AlertActions.setErrorLogin('Unknown error'))
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
                                    <Stack>
                                        <Field
                                            name="password"
                                            label="Password"
                                            type="password"
                                            as={TextField}
                                            error={errors.password && touched.password}
                                            helperText={touched.password ? errors.password : ''}
                                            maxLength="60"
                                        />
                                        <Typography textAlign="right" paragraph><Link to="/reset">Forgot password</Link></Typography>
                                    </Stack>

                                    <Button type="submit" variant="contained" size="large">Submit</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Stack>
                <Typography textAlign="center" variant="h6">If you don't have account, you can <Link to="/register">register</Link></Typography>
            </Stack>
        </Box>
    )
}

export default Login