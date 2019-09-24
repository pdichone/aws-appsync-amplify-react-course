import React, { Component } from 'react'
import EditPost from '../components/EditPost'
import DeletePost from '../components/DeletePost'

class Post extends Component {
     
    componentDidMount() {
        this.props.subscribeToMore()
    }
   
    render() {
        const items = this.props.data.listPosts.items
        
        return items.map((post) => {
            return (
                <div style={rowStyle} key={post.id}>
                     <time style={{fontStyle:"italic", float:"right"}} dateTime={post.createdAt}>
                         {"Created on "}{new Date(post.createdAt).toDateString()}
                     </time>
                     <h1>{post.title}</h1>
                     <p >{post.body}</p>
                    
                     <br />

                     <EditPost { ...post}/>
                     <DeletePost { ...post}/>


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
export default Post