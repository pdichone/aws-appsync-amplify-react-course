import React, { Component } from "react";
import { API, graphqlOperation } from 'aws-amplify'
import { createPost } from '../graphql/mutations';
import { Auth } from 'aws-amplify';




class CreatePost extends Component {

  state = {

    postOwnerId: '',
    postOwnerUsername: '',
    numberLikes: 0,
    postTitle: "",
    postBody: "",
  }

  componentDidMount = async () => {

    await Auth.currentUserInfo()
      .then(user => {
        this.setState(
          {
            postOwnerUsername: user.username,
            postOwnerId: user.attributes.sub,
          }
        )
      })
  }

  handleChangePost = event => this.setState({ [event.target.name]: event.target.value })

  handleAddPost = async event => {

    event.preventDefault()

    const input = {
      postOwnerId: this.state.postOwnerId, // Todo: will add id automatically later
      postOwnerUsername: this.state.postOwnerUsername,
      postTitle: this.state.postTitle,
      postBody: this.state.postBody,
      createdAt: new Date().toISOString(),
    }


    await API.graphql(graphqlOperation(createPost, { input }))

    this.setState({ postTitle: "", postBody: "" })// clear fields
  }

  render() {
    return (
      <div>

        <form className="add-post"
          onSubmit={this.handleAddPost}>

          <input
            style={{ fontSize: '19px' }}
            type="text" placeholder="Title"
            name="postTitle"
            required
            value={this.state.postTitle}
            onChange={this.handleChangePost}

          />

          <textarea
            type="text"
            name="postBody"
            rows="3"
            cols="40"
            required
            placeholder="Post your thought"
            value={this.state.postBody}
            onChange={this.handleChangePost}
          />
          <input type="submit"
            className="btn"
            style={{ fontSize: '19px' }} />

        </form>

      </div>
    )
  }
}
export default CreatePost;
