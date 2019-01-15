import React, {Component} from 'react'
import QueueItem from './QueueItem'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getQueue, starItem} from './actions/queue'

class Queue extends Component{
    
    componentDidMount(){
        this.props.getQueue(this.props.auth.user.id)
    }

    starItem = (id) => {
        
        return this.props.starItem(this.props.auth.user.id, id)
    }

    render(){
        return(
            <div className="queue">
                {this.props.queue.map((item, i) => <QueueItem starItem={() => this.starItem(item.id)} key={i} {...item}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({queue: state.queue, auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({getQueue, starItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Queue)