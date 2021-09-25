import gql from 'graphql-tag';

export const QUERY_USER_LIST = gql`
    query GetUsers {
        users {
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
