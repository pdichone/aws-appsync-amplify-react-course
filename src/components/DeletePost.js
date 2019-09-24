import React, {Component} from 'react'
import { Mutation } from 'react-apollo'
import { deletePost } from '../graphql/mutations'
import gql from 'graphql-tag'
import { listPosts } from '../graphql/queries'


class DeletePost extends Component {
    
    handleDelete = (deletePost) => {
         deletePost({
              variables: {
                   input: {
                       id: this.props.id
                   }
              },
              //optimistic response
               optimisticResponse: () => ({
                   deletePost: {
                       //Must match the return type of the query below (listPosts)
                       __typename: 'ModelPostConnection',
                       id: this.props.id,
                       title: this.props.title,
                       body: this.props.body,
                       createdAt: this.props.createdAt
                   }
               }),
               update: (cache, { data: {deletePost}}) => {
                  const query = gql(listPosts)

                  //Read query from cache
                  const data = cache.readQuery({ query })

                  //Add updated postList to the cache copy
                  data.listPosts.items = [
                       ...data.listPosts.items.filter(item =>
                          item.id !== this.props.id)
                  ]

                  //Overwrite the cache with the new results
                  cache.writeQuery({ query, data })
               }
         })
    }

    render() {
         return (
            <Mutation mutation={gql(deletePost)}>
            {(deletePost, { loading, error }) => {
                return <button onClick={
                   () => this.handleDelete(deletePost)}>
                    Delete Blog Post</button>
            }}
        </Mutation>
         )
    }
}
export default DeletePost