import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink,concat } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import App from './App';
import reportWebVitals from './reportWebVitals';


const wsLink = new WebSocketLink({
    uri: "ws://34.122.18.134:8080/api/v1/graphql",
    options: {
        reconnect: true,
    },
});


const httpLink = new HttpLink({
    uri: 'http://34.122.18.134:8080/api/v1/graphql'
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: "Bearer ming3379" || null,
        }
    }));
    return forward(operation);
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, link),
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
