import React from 'react'
import styles from './postsList.module.css'
import PostComponent from '../post/postComponent'
import PostInput from '../postInput/postInput'

function PostsList({posts, user, auth}) {

  const postsList = posts.map(post => {
    return (
      <PostComponent key={post.id} post={post} auth={auth}/>
    )
  })
  return (
    <div>
      <h1>Posts</h1>

      <PostInput user={user} auth={auth}/>

      {postsList}
    </div>
  )
}

export default PostsList;