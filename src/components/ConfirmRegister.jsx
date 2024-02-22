import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom";
import { AlertActions } from "../redux/slices/AlertSlice";
import AuthService from "../services/AuthService";

export async function ConfirmRegisterLoader({ params })
{
    try {
        const { status, data } = await AuthService.confirmEmail(params.code);
        return { status, data, code: params.code }
    } catch({response}) {
        return { status: response.status, data: response.data, code: params.code }
    }
}

function ConfirmRegister()
{
    const { status, data } = useLoaderData()
    const dispatch = useDispatch()

    if (status === 201)
    {
        dispatch(AlertActions.setSuccessLogin('You have registered successfully'))
        return <Navigate to="/login" replace/>
    }

    if (data.message)
    {
        dispatch(AlertActions.setErrorRegister(data.message))
    } else if (status === 404)
    {
        dispatch(AlertActions.setErrorRegister("Uknown register confirmation link"))
    } else {
        dispatch(AlertActions.setErrorRegister("Uknown error, try again"))
    }

    return <Navigate to="/register" replace/>
}

export default ConfirmRegister