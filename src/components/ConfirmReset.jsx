
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Box, Typography, Button, TextField, Stack, Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { AlertActions } from "../redux/slices/AlertSlice";


export async function ConfirmResetLoader({ params }) {
    try {
        const { status, data } = await AuthService.getPasswordCodeUser(params.code);
        return { status, data, code: params.code }
    } catch ({ response }) {
        return { status: response.status, data: response.data, code: params.code }
    }
}

function ConfirmReset() {
    const { status, data, code } = useLoaderData()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useSelector(data => data.Alert.newPassword)

    useEffect(() => {
        document.title = process.env.REACT_APP_BRAND_NAME + " Set password"
    }, [])

    if (status === 404 || status === 500) {
        dispatch(AlertActions.setErrorPassword(data.message || 'Unknown error, try again'))
        return <Navigate to="/reset" replace />
    }

    const validation = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, 'Password must be 8 characters long.')
            .max(30, 'Password must be 30 characters long.')
            .required('Password is required.'),
        newPassword2: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Password confirmation is required.'),
    });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack width="100%" spacing={3} p={1} mt={3} maxWidth="600px">
                <Typography textAlign="center" variant="h4">Set new password</Typography>
                <Typography textAlign="center" variant="h6">Changing password for {data.email}</Typography>
                <Stack p={2} spacing={1}>
                    <Collapse in={!!alert.value}>
                        <Alert
                            severity={alert.severity}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        dispatch(AlertActions.clearNewPassword())
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
                            AuthService.setPassword(code, data.newPassword).then(() => {
                                dispatch(AlertActions.setSuccessLogin('Password has changed successfully'))
                                navigate('/login')
                            }).catch(({ response }) => {
                                if (response.data.message) {
                                    dispatch(AlertActions.setErrorRegister(response.data.message))
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
                                        name="newPassword"
                                        label="New password"
                                        type="password"
                                        as={TextField}
                                        error={errors.newPassword && touched.newPassword}
                                        helperText={touched.newPassword ? errors.newPassword : ''}
                                        maxLength="60"
                                    />
                                    <Field
                                        name="newPassword2"
                                        label="Confirm new password"
                                        type="password"
                                        as={TextField}
                                        error={errors.newPassword2 && touched.newPassword2}
                                        helperText={touched.newPassword2 ? errors.newPassword2 : ''}
                                        maxLength="60"
                                    />
                                    <Button type="submit" variant="contained" size="large">Change password</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ConfirmReset