import React from 'react'

export default function QueueItem(props){
    //faName is used to match props.type with the appropriate font awesome class name
    const faName = {
        music: 'fa fa-music',
        video: 'fa fa-tv',
        game: 'fa fa-gamepad',
        places: 'fa fa-map-marker',
        link: 'fa fa-link'
    }
    return (
        <div className={`queueItem ${props.type} ${props.read ? 'read' : null}`}>
            <div className="cardWrapper">
                <i className={`fa ${props.starred ? 'fa-star' : 'fa-star-o'}`} onClick={props.starItem}></i>
                <div className="cardImg" style={{ backgroundImage: `url("${props.img}")`} } onClick={props.readItem}>
                    <a href={props.url} target="_blank" onClick={props.readItem}></a>
                    {props.img === '' ? <i className={faName[props.type]}></i> : null}
                </div>
                <div className="cardText">
                    <a href={props.url} target="_blank" onClick={props.readItem}><h3>{props.title || props.type + ' suggestion'} </h3></a>
                    <p>{props.desc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum dolor, lacinia sed sagittis pellentesque, volutpat et purus.'}</p>
                </div>
            </div>
            <p className="rec">Recommended by: {props.referral_name || 'Example person'}</p>
        </div>
    )
}
