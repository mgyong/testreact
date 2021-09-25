import gql from 'graphql-tag';

export const CREATEUSER_MUTATE = gql`
        mutation InsertUser {
            users(insert: $data) {
                id
                username
                password
                full_name
                email
                last_name
                first_name
                mailing_address
                phone
                phone1
                created_at
                updated_at
            }
        }
`;

