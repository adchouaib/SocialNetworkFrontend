import React from 'react'
import UserCard from '../userCard/UserCard'
import styles from './FriendList.module.css'

function FriendList({friends , auth}) {

  const friendlists = friends.map(friend => <UserCard key={friends.indexOf(friend)} id={friend.id} name={friend.fullName} avatar={friend.avatar} description={friend.description} work={friend.work} auth={auth}/>)

  return (
    <>
      <h1>friend List</h1>
      <div className={styles.grid}>
        {friendlists}
      </div>
    </>
  )
}

export default FriendList