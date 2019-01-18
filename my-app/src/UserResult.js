import React from 'react'

export default function UserResult(props){
    return(
        <div className="userResult" onClick={() => {props.addFriend(); props.handleClick()}}>
            <div className="userImg" style={{backgroundImage: `url("${props.img}")`}} >{props.img === '' ? props.f_name[0] : null}</div>
            <p>{props.username}</p>
        </div>
    )
}