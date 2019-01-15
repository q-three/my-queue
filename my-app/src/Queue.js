import React, {Component} from 'react'
import QueueItem from './QueueItem'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getQueue} from './actions/queue'

class Queue extends Component{
    
    componentDidMount(){
        this.props.getQueue(this.props.auth.user.id)
    }

    render(){
        return(
            <div className="queue">
                {console.log(this.props.queue)}
            </div>
        )
    }
}

const mapStateToProps = state => ({queue: state.queue, auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({getQueue}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Queue)