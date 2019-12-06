import React, { Component } from 'react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { updatePost } from '../graphql/mutations'


class EditPost extends Component {

    state = {
        show: false,
        id: "",
        postOwnerId: "",
        postOwnerUsername: "",
        postTitle: "",
        postBody: "",
        postData: {
             postTitle: this.props.postTitle,
             postBody: this.props.postBody
        }

    }

    handleModal = () => {
         this.setState({ show: !this.state.show})
         document.body.scrollTop = 0
         document.documentElement.scrollTop = 0
    }

    handleUpdatePost = async (event) => {
         event.preventDefault()

         const input = {
              id: this.props.id,
              postOwnerId: this.state.postOwnerId,
              postOwnerUsername: this.state.postOwnerUsername,
              postTitle: this.state.postData.postTitle,
              postBody: this.state.postData.postBody

         }

         await API.graphql(graphqlOperation(updatePost, { input }))

         //force close the modal 
         this.setState({ show: !this.state.show})

    }
     
    handleTitle = event => {
         this.setState({
             postData: {...this.state.postData, postTitle: event.target.value}
              
         })
    }
    handleBody = event => {
         this.setState({ postData: {...this.state.postData,
          postBody: event.target.value}})
    }
    componentWillMount = async () => {

        await Auth.currentUserInfo()
            .then(user => {
                 this.setState({
                     postOwnerId: user.attributes.sub,
                     postOwnerUsername: user.username 
                 })
            })
         
    }

    render() {
         return (
             <>
             { this.state.show && (
                 <div className="modal">
                      <button className="close"
                         onClick={this.handleModal}>
                          X
                      </button>

                      <form className="add-post"
                         onSubmit={(event) => this.handleUpdatePost(event)}>

                             <input style={{fontSize: "19px"}}
                                  type="text" placeholder="Title"
                                  name="postTitle"
                                  value={this.state.postData.postTitle}
                                  onChange={this.handleTitle} />

                             <input 
                                style={{height: "150px", fontSize: "19px"}}
                                type="text"
                                name="postBody"
                                value={this.state.postData.postBody}
                                onChange={this.handleBody}
                                />

                             <button>Update Post</button>


                      </form>

                      
                 </div>
             )
             }


                    
                <button onClick={this.handleModal}>Edit</button>
             </>

             
         )
    }
}

export default EditPost;
