import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import {USER_LOGIN} from "./query";

export interface loginResponse {
    access_token?: string;
    error_message?: string;
    created_on?: string;
}

export interface userLoginVars {
    username: string;
    password: string;
}

export const UserLoginContainer = () => {
    //const inputuq:userLoginVars = {username: "kay115",password: "kay115password"};
    const inputuq:userLoginVars = {username: "johnl",password: "johnlpassword"};
    const { data, error, loading } = useQuery(USER_LOGIN,
        {variables: inputuq});

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        console.log(error);
        return (
            <div>error</div>);
    }
    console.log("data: ",data);

    return (
        <div>
            <h3>User Signup</h3>
            <p>Login for {inputuq.username} token: {data.loginUser.access_token} created</p>
        </div>
    );
}

export function LoginQuery(inputuq:userLoginVars){

    const [getToken, { loading, error, data }] = useLazyQuery(USER_LOGIN,
        {variables: inputuq});

    return [getToken, loading, error, data ]

}