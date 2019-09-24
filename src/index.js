import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import aws_config from './aws-exports'
import * as serviceWorker from './serviceWorker';



import { listPosts } from './graphql/queries'
import { ApolloProvider } from 'react-apollo';

const client = new AWSAppSyncClient({
     url: aws_config.aws_appsync_graphqlEndpoint,
     region: aws_config.aws_appsync_region,
     auth: {
         type: AUTH_TYPE.API_KEY,
         apiKey: aws_config.aws_appsync_apiKey
     }
})

client.query({
    query: gql(listPosts)
}).then(({ data }) => {
     console.log("Blog data: ", data)
})
ReactDOM.render(
    /*
    Next we import an ApolloProvider component from the ‘react-apollo’ 
    and wrap it in our App component 
    by passing a client so that we can access 
    the client anywhere from our react app.
     */
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
