import React, {Component} from 'react'
import Result from './Result'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addItem} from './actions/queue'

class SearchResults extends Component{
  addToQueue = (body) => {
    body.id = this.props.friends.selectedUser
    body.user_id = this.props.friends.selectedUser //duplicate values based on schema - both keys are needed.
    this.props.addItem(body)
    this.props.successReset()
    this.props.handleClick()
  }

  render(){
    return (
      <div className="searchResults" data-type={this.props.type}>
        {Array.isArray(this.props.results) 
        ? this.props.results.map((item, i) => {
          return  <Result 
                    key={i} 
                    {...item}
                    clearQuery={this.props.handleClick}
                    handleClick={() => this.addToQueue({
                      type:this.props.type, 
                      url: item.url, 
                      img:item.img, 
                      desc: item.title, 
                      referral_id: this.props.auth.user.id 
                    })}
                  />
          })
        : <p className="ellipses"><span>.</span><span>.</span><span>.</span></p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth, queue: state.queue, friends: state.friends})
const mapDispatchToProps = dispatch => bindActionCreators({addItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)