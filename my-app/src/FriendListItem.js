import React from 'react'

export default function FriendListItem(props){
  return (
    <div className="friendListItem">
        <div className="userImg" style={{ backgroundImage: `url("${props.img}")` }} >{props.img === '' ? <h3>{props.username[0].toUpperCase()}</h3> : null}</div>
        <h2>{props.username}</h2>
    </div>
  )
}