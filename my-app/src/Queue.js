import React, {Component} from 'react'
import QueueItem from './QueueItem'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getQueue, starItem, readItem, deleteItem} from './actions/queue'

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
    deleteItem = async (id) => {
        let response = await this.props.deleteItem(id)
        return this.props.getQueue(this.props.auth.user.id)
    }

    byType = (ele) => {
        if(!ele || ele.starred === undefined || ele.type === undefined) return false
        if(this.props.queue.filter === 'starred'){
            return ele.starred === true
        }
        return ele.type.toLowerCase().includes(this.props.queue.filter.toLowerCase())
    }

    render(){
        return(
            <div className="queue">
                {this.props.queue.items.filter(this.byType).map((item, i) => <QueueItem deleteItem={() => this.deleteItem(item.id)} starItem={() => this.starItem(item.id)} readItem={() => this.readItem(item.id)} key={i} {...item}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({queue: state.queue, auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({getQueue, starItem, readItem, deleteItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Queue)