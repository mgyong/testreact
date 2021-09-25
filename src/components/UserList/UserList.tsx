import * as React from 'react';
import {useQuery} from "@apollo/client";
import {QUERY_USER_LIST} from "./query";

interface User {
    id: number;
    username: string;
    full_name: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    mailing_address: string;
    phone: string;
    phone1: string;
    updated_at: string;
    created_at: string;
}

export const UserListContainer = () => {
    const { data, error, loading } = useQuery(QUERY_USER_LIST);

    if (error || !data) {
        console.log(error);
        return <div>ERROR</div>;
    }
return(
    <div>
        <h3>Available Users</h3>
        {loading ? (
            <p>Loading ...</p>
        ) : (
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>password</th>
                    <th>name</th>
                    <th>email</th>
                    <th>created_on</th>
                </tr>
                </thead>
                <tbody>
                {data.users.map(user => (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>{user.created_at}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
    </div>
);
}