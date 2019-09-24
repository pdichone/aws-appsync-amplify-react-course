import React from 'react';
import './App.css';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import DisplayPosts from './components/DisplayPosts'

//====== Start Auth config =====
//auth with appsync
import { withAuthenticator } from 'aws-amplify-react'
import Amplify from 'aws-amplify'

//Get the resources configurations params
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)
//====== End Auth config =====

function App() {
  return (
    <div className="App">
      <Header />
      <CreatePost />
      <DisplayPosts />
     
    </div>
  );
}

export default withAuthenticator(App, {
   includeGreetings: true
});
