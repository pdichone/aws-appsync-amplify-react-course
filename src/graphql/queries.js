/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
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
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      }
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
        }
      }
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      }
      content
      createdAt
    }
    nextToken
  }
}
`;
export const getLike = `query GetLike($id: ID!) {
  getLike(id: $id) {
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
export const listLikes = `query ListLikes(
  $filter: ModelLikeFilterInput
  $limit: Int
  $nextToken: String
) {
  listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      }
    }
    nextToken
  }
}
`;
