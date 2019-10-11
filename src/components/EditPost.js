import React, { Component } from 'react'
import { updatePost } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';

class EditPost extends Component {

    state = {
        show: false,
        id: "",
        postOwnerId: '',
        postOwnerUsername: '',
        likeOwnerUsername: '',
        likeOwnerId: '',
        numberLikes: 0,
        postTitle: "",
        postBody: "",
        postData: {
            postTitle: this.props.postTitle,
            postBody: this.props.postBody
        }

    }

    componentDidMount = async () => {
        // Get the current authenticated user

        //     Auth.currentUserInfo()
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   });

        await Auth.currentUserInfo()
            .then(user => {
                // console.log("stuff: ", JSON.stringify(user))
                this.setState(
                    {
                        postOwnerUsername: user.username,
                        postOwnerId: user.attributes.sub,
                        likeOwnerUsername: user.username,
                        likeOwnerId: user.attributes.sub
                    }
                )
            })
    }

    handleModal = () => {
        this.setState({ show: !this.state.show })
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    handleUpdatePost = async (event) => {

        event.preventDefault();
        //  const { id, post } = this.state

        const input = {
            id: this.props.id,
            postOwnerId: this.state.postOwnerId, // Todo: will add id automatically later
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postData.postTitle,
            postBody: this.state.postData.postBody
            //createdAt: new Date().toISOString()
        }

        await API.graphql(graphqlOperation(updatePost, { input }))
        //console.log("UPdATE: ", JSON.stringify(result))

        //force closing the modal
        this.setState({ show: !this.state.show })

    }

    handleTitle = event => {
        this.setState({
            postData: { ...this.state.postData, postTitle: event.target.value }
        })
    }
    handleBody = event => {
        this.setState({ postData: { ...this.state.postData, postBody: event.target.value } })
    }
    render() {
        return (
            <>
                {this.state.show && (
                    <div className="modal">
                        <button className="close" onClick={this.handleModal}>
                            X
                </button>

                        <form className="add-post"
                            onSubmit={(event) => this.handleUpdatePost(event)}>
                            <input
                                style={{ fontSize: '19px' }}
                                type="text" placeholder="Title"
                                name="postTitle"
                                value={this.state.postData.postTitle}
                                onChange={this.handleTitle}

                            />

                            {/* <textarea 
                          style={{height:'150px', width: '240px', fontSize: '19px'}}
                          type="text"
                          name="postBody"
                          required
                          value={this.state.postData.postBody}
                           onChange={this.handleBody}
                          /> */}

                            <input
                                style={{ height: '150px', fontSize: '19px' }}
                                type="text"
                                name="postBody"
                                //placeholder="Post your thought"
                                value={this.state.postData.postBody}
                                onChange={this.handleBody}

                            />
                            <button>Update Post</button>
                        </form>
                    </div>
                )}
                <button onClick={this.handleModal}>Edit</button>
            </>
        )
    }
}
export default EditPost;
