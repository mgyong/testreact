import gql from 'graphql-tag';

export const GET_USER = gql`
    query GetUser {
        users(where: {username: {eq: $username}}) {
            id
            full_name
            username
            email
            first_name
            last_name
            password
            mailing_address
            phone
            phone1
            updated_at
            created_at
        }
    }`;

export const UPDATE_USER = gql`
    mutation UpdateUser {
        users(where: {username: {eq: $username}}, update:$data) {
            full_name
            username
            email
            first_name
            last_name
            password
            mailing_address
            phone
            phone1
            updated_at
            created_at
        }
    }`;

