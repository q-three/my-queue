import React, {Component} from 'react'
import QueueItem from './QueueItem'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getQueue, starItem, readItem} from './actions/queue'

class Queue extends Component{
    
    componentDidMount(){
        this.props.getQueue(this.props.auth.user.id)
    }

    starItem = (id) => {
        return this.props.starItem(this.props.auth.user.id, id)
    }
    readItem = (id) => {
        return this.props.readItem(id)
    }

    render(){
        return(
            <div className="queue">
                {this.props.queue.map((item, i) => <QueueItem starItem={() => this.starItem(item.id)} readItem={() => this.readItem(item.id)} key={i} {...item}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({queue: state.queue, auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({getQueue, starItem, readItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Queue)