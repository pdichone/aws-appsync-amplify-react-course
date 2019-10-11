import React, { Component } from 'react'
import { listPosts, listLikes } from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify';
import Post from '../components/Post'
import { onCreatePost, onUpdatePost, onCreateLike, onCreateComment } from '../graphql/subscriptions'
import { onDeletePost } from '../graphql/subscriptions'
import { Auth } from 'aws-amplify';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import { createLike, updatePost } from '../graphql/mutations'
import CreateCommentPost from './CreateCommentPost';
import CommentPost from './CommentPost';


class DisplayPosts extends Component {

    state = {
        id: "",
        post: "",
        posts: [],
        ownerId: "",
        ownerUsername: "",
        creatingLike: false,
    }
    componentDidMount = async () => {

        this.getPosts();

        await Auth.currentUserInfo()
            .then(user => {
                this.setState(
                    {
                        ownerId: user.attributes.sub,
                        ownerUsername: user.username,
                    }
                )
            })

        /*
         Must put the subscribe reference in a variable so we 
         can unmount and get rid of it when we are done listening to
         subscriptions!
        */
        this.createPostListener = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: postData => {
                console.log("Sub: Created Post: ", postData)
                const newPost = postData.value.data.onCreatePost
                const prevPosts = this.state.posts.filter(post => post.id !== newPost.id)

                const updatedPosts = [newPost, ...prevPosts];

                this.setState({ posts: updatedPosts });
            }
        });

        this.deletePostListener = API.graphql(graphqlOperation(onDeletePost)).subscribe({
            next: postData => {
                const deletedPost = postData.value.data.onDeletePost
                const updatedPosts = this.state.posts.filter(post => post.id !== deletedPost.id)
                this.setState({ posts: updatedPosts })
            }
        });

        this.updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
            .subscribe({
                next: postData => {
                    const { posts } = this.state;
                    const updatedPost = postData.value.data.onUpdatePost;
                    const index = posts.findIndex(post => post.id === updatedPost.id);
                    const updatedPosts = [...posts.slice(0, index), updatedPost,
                    ...posts.slice(index + 1)];

                    this.setState({ posts: updatedPosts, post: "", id: "" })
                }

            });

        this.createPostLikeListener = API.graphql(graphqlOperation(onCreateLike))
            .subscribe({
                next: postData => {

                    console.log("Shoot:", JSON.stringify(postData.value.data.onCreateLike));

                    const createdLike = postData.value.data.onCreateLike;

                    let posts = [...this.state.posts];
                    for (let post of posts) {
                        if (createdLike.post.id == post.id) {
                            post.likes.items.push(createdLike);
                        }
                    }

                    this.setState({ posts });
                }
            });
        this.createPostCommentListener = API.graphql(graphqlOperation(onCreateComment))
            .subscribe({
                next: commentData => {
                    console.log("Shoot:", JSON.stringify(commentData.value.data.onCreateComment));
                    const createdComment = commentData.value.data.onCreateComment;
                    let posts = [...this.state.posts];
                    for (let post of posts) {
                        if (createdComment.post.id == post.id) {
                            post.comments.items.push(createdComment);
                        }
                    }

                    this.setState({ posts });
                }
            })
    }

    componentWillUnmount() {
        this.createPostListener.unsubscribe(); // cleanup all listeners we setup
        this.deletePostListener.unsubscribe();
        this.updatePostListener.unsubscribe();
        this.createPostLikeListener.unsubscribe();
        this.createPostCommentListener.unsubscribe();
    }


    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts));
        this.setState({ posts: result.data.listPosts.items })

        console.log("AllPosts: ", JSON.stringify(result.data.listPosts.items))
    }

    likedPost = (postId) => {
        for (let post of this.state.posts) {
            if (post.id == postId) {
                if (post.postOwnerId == this.state.ownerId) return true;
                for (let like of this.state.posts.likes.items) {
                    if (like.likeOwnerId == this.state.ownerId) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    commentedPost = (postId) => {
        for (let post of this.state.posts) {
            if (post.id == postId) {
                if (post.postOwnerId == this.state.ownerId) return true;
                for (let comment of this.state.posts.comments.items) {
                    if (comment.commentOwnerId == this.state.ownerId) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    handleLike = async postId => {
        if (this.likedPost(postId)) return;
        const input = {
            numberLikes: 1,
            likeOwnerId: this.state.ownerId,
            likeOwnerUsername: this.state.ownerUsername,
            likePostId: postId
        }
        try {
            const result = await API.graphql(graphqlOperation(createLike, { input }))
            console.log("CreateLike: ", result.data)
        } catch (error) {
            console.error(error);
        }
    }

    render() {

        //destructure
        const { posts } = this.state;

        console.log(posts);
        let loggedInUser = this.state.ownerId // Get the user ID

        return posts.map((post) => {
            return (
                <div className="posts" style={rowStyle} key={post.id}>

                    <h1>{post.postTitle}</h1>
                    <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
                        {"Wrote by: "} {post.postOwnerUsername}
                        {" on "}
                        <time style={{ fontStyle: "italic" }} dateTime={post.createdAt}>
                            {" "}
                            {new Date(post.createdAt).toDateString()}
                        </time>
                    </span>
                    <p >{post.postBody}</p>

                    <br />
                    <span>
                        {post.postOwnerId === loggedInUser && // only owner can delete their post
                            <DeletePost data={post} />
                        }

                        {post.postOwnerId === loggedInUser && // only owner can edit their post
                            < EditPost {...post} />
                        }
                        {
                            console.log("Likes: ", JSON.stringify(post.likes.items))
                        }
                        <pre>
                            <p onClick={() => this.handleLike(post.id)} className="like-button">Like {post.likes.items.length}</p>
                        </pre>
                        <span>
                            <span>comments</span>
                            <CreateCommentPost postId={post.id}/>
                            {
                                post.comments.items.map((comment, index) => <CommentPost key={index} commentData={comment} />)
                            }
                        </span>
                    </span>
                </div>
            )
        })
    }
}

const btnStyle = {
    margintop: '12px',
    background: '#d4d4',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    cursor: 'pointer',
    float: 'top'
}
const rowStyle = {
    background: '#f4f4f4',
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px'

}
export default DisplayPosts;
