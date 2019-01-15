import React from 'react'

export default function FriendListItem(props){
  return (
    <div className="friendListItem">
        <div className="userImg" style={{ backgroundImage: `url("${props.img}")` }} >{props.img === '' ? props.username[0] : null}</div>
        <h2>{props.username}</h2>
    </div>
  )
}