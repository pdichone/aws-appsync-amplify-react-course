/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
    id
    postOwnerId
    postOwnerUsername
    postTitle
    postBody
    createdAt
    comments {
      items {
        id
        commentOwnerId
        commentOwnerUsername
        content
        createdAt
      }
      nextToken
    }
    likes {
      items {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
      }
      nextToken
    }
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
    id
    postOwnerId
    postOwnerUsername
    postTitle
    postBody
    createdAt
    comments {
      items {
        id
        commentOwnerId
        commentOwnerUsername
        content
        createdAt
      }
      nextToken
    }
    likes {
      items {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
      }
      nextToken
    }
  }
}
`;
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
    id
    postOwnerId
    postOwnerUsername
    postTitle
    postBody
    createdAt
    comments {
      items {
        id
        commentOwnerId
        commentOwnerUsername
        content
        createdAt
      }
      nextToken
    }
    likes {
      items {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
      }
      nextToken
    }
  }
}
`;
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
    id
    commentOwnerId
    commentOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
    content
    createdAt
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
    id
    commentOwnerId
    commentOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
    content
    createdAt
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
    id
    commentOwnerId
    commentOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
    content
    createdAt
  }
}
`;
export const onCreateLike = `subscription OnCreateLike {
  onCreateLike {
    id
    numberLikes
    likeOwnerId
    likeOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
  }
}
`;
export const onUpdateLike = `subscription OnUpdateLike {
  onUpdateLike {
    id
    numberLikes
    likeOwnerId
    likeOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
  }
}
`;
export const onDeleteLike = `subscription OnDeleteLike {
  onDeleteLike {
    id
    numberLikes
    likeOwnerId
    likeOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
  }
}
`;
