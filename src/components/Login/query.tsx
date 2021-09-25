import gql from 'graphql-tag';

export const USER_LOGIN = gql`
    query UserLogin {
        users(where: {username: {eq: $username}}) {
            password
        }
    }`;