import gql from 'graphql-tag';

export const ALL_CHATS = gql`
    query allChats {
        chats {
            id
            name
            message
        }
    }
`;

export const CHATS_SUBSCRIPTION = gql`
    subscription OnNewChat {
        chats {
            id
            name
            message
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation {
        chats(insert: $data) {
            id
            name
            message
        }
    }
`;
