import React, {Component} from 'react'
import Result from './Result'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addItem} from './actions/queue'

class SearchResults extends Component{
  addToQueue = (body) => {
    
  }

  render(){
    return (
      <div className="searchResults" data-type={this.props.type}>
        {Array.isArray(this.props.results) 
        ? this.props.results.map((item, i) => {
          return  <Result 
                    key={i} 
                    {...item}
                    handleClick={() => this.addToQueue({
                      type:this.props.type, 
                      url: item.url, 
                      img:item.img, 
                      desc: item.title, 
                      referral_id: this.props.auth.user.id 
                    })} />
          })
        : <p>...</p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth, queue: state.queue})
const mapDispatchToProps = dispatch => bindActionCreators({addItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)