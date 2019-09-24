import  React, { Component } from "react";
import { Mutation } from "react-apollo";
import { createPost } from '../graphql/mutations';
import gql from "graphql-tag";





class CreatePost extends React.Component {
    handleSubmit = (e, createPost) => {
      e.preventDefault();
      createPost({
        variables: {
          input: {
            title: this.title.value,
            body: this.body.value,
            createdAt: new Date().toISOString()
          }
        }
      }).then(res => {
        this.title.value = "";
        this.body.value = "";
      });
    };
    render() {
      return (
        <div>
      
          <Mutation mutation={gql(createPost)}>
            {(createPost, { data, loading, error }) => {
              return (
                <div>
                  <form
                    className="add-post"
                    onSubmit={e => this.handleSubmit(e, createPost)}
                  >
                    <input
                     style={{fontSize: '19px'}}
                      type="text" placeholder="Title"
                      
                      ref={node => (this.title = node)}
                      required
                    />
                    <input
                     style={{height:'150px', fontSize: '19px'}}
                      type="text"
                      placeholder="Body"
                      ref={node => (this.body = node)}
                      required
                    />
                    <input type="submit" value={loading ? "Hooray!": "Save Blog Post"}
                   className="btn"
                    style={{fontSize: '19px'}}
                   />
                  </form>
                  {error && <p>{error.message}</p>}
                </div>
              );
            }}
          </Mutation>
        </div>
      );
    }
  }
  
  export default CreatePost;