import React from 'react'

export default function Result(props){
    return (
        <div className="searchItem" onClick={() => {props.handleClick(); props.clearQuery()}}>
            <img src={props.img} alt={props.title}></img>
            <div className="searchText">
                <h3>{props.title}</h3>
            </div>
        </div>
    )
}