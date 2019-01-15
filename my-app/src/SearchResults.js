import React, {Component} from 'react'
import Result from './Result'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class SearchResults extends Component{


  addToQueue = (type, url, img, item_url, desc, user_id) => {
    const body = {
      type: '',
      url: '',
      refferal_id: '',
      img: '',
      desc:'',
      user_id: ''
    }
  }

  render(){
    return (
      <div className="searchResults" data-type={this.props.type}>
        {Array.isArray(this.props.results) 
        ? this.props.results.map((item, i) => <Result key={i} {...item}/>)
        : <p>...</p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth, queue: state.queue})
const mapDispatchToProps = dispatch => bindActionCreators()

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)