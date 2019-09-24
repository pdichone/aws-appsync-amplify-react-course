import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { listPosts } from '../graphql/queries'
import { onCreatePost } from '../graphql/subscriptions'
import gql from 'graphql-tag'
import Post from './Post'

class DisplayPosts extends Component {

    subsCribeNewPosts = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreatePost),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newPostData = subscriptionData.data.onCreatePost;
                return Object.assign({}, prev, {
                    listPosts: {
                        ...prev.listPosts,
                        items: [newPostData , ...prev.listPosts.items]
                        //items: [ ...prev.listPosts.items, newPostData ] this will put oldest one at the top
                    }
                })
            }
        })
    }


    render() {
        return (
            <div className="posts">
                <Query query={gql(listPosts)}  >
                    {({ loading, data, error, subscribeToMore }) => {

                        if (loading) return <p>loading...</p>
                        if (error) return <p>{error.message}</p>
          console.log("Raw data: ", data)

                        return <Post data={data} subscribeToMore={() =>
                            this.subsCribeNewPosts(subscribeToMore)} />
                    }}
                </Query>



            </div>
        )
    }
}


export default DisplayPosts;