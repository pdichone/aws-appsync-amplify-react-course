import React, { Component} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { deletePost } from '../graphql/mutations'

class DeletePost extends Component {


    handleDeletePost = async postId => {
         const input = {
              id: postId
         }

         await API.graphql(graphqlOperation(deletePost, {input}))
    }
    render() {
        const post = this.props.data
         return (
             <button onClick= { () => this.handleDeletePost(post.id) }>Delete</button>
         )
    }
}
export default DeletePost;
