import React, { Component } from "react";

class CommentPost extends Component {

  render() {
    const {content, commentOwnerUsername, createdAt} = this.props.commentData;
    return (
      <div className="comment">
        <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
          {"Wrote by: "} {commentOwnerUsername}
          {" on "}
          <time style={{ fontStyle: "italic" }} dateTime={createdAt}>
            {" "}
            {new Date(createdAt).toDateString()}
          </time>
        </span>
        <p >{content}</p>
      </div>
    )
  }
}
export default CommentPost;
