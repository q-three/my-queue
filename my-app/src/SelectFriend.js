import React from 'react'

export default function SelectFriend(props){
    return(
        <div className="userResult" onClick={props.selectFriend}>
        <div className="userImg" style={{backgroundImage: `url("${props.img}")`}} >{props.img === '' ? props.username[0].toUpperCase() : null}</div>
        <p>{props.username}</p>
      </div>
    )
}