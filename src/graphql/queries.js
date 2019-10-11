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
nextToken
}
}
`;
