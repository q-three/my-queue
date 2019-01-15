import React, {Component} from 'react'
import {request} from './utils/request'
import SearchResults from './SearchResults'

class OmniSearch extends Component{
  constructor(props){
    super(props)
    this.state = {
      type: '',
      query: '',
      error: '',
      results: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    })

    try{
      if(this.state.type === '') throw new Error('Select a category')
      return request(`/search/${this.state.type}`, 'post', {query: this.state.query})
      .then(response => {
        console.log(response, '888888888888888888888888888888888888888888888')
        this.setState({
          results: response
        })
      })
    }catch(err){
      this.setState({
        error:'Select a category'
      })
    }
  }

  handleClick = () => {
    this.setState({
      query: '',
      results: false
    })
  }

  render() {
    return (
      <section>
        <div className="omniSearch">
          {console.log(this.state)}
          <select name="type" className="omniSelect" onChange={(e) => this.handleChange(e)}>
            <option value="">Select category...</option>
            <option value="music">Music</option>
            <option value="video">Video</option>
            <option value="games">Games</option>
            <option value="places">Places</option>
          </select>
          <input name="query" type="text" className="omniInput" placeholder='search...' onChange={(e) => this.handleChange(e)}/>
        </div>
        {this.state.results ? <SearchResults type={this.state.type} results={this.state.results}/> : null}
        {this.state.error === '' ? null : <div className="warning">{this.state.error}</div>}
        {this.state.results ? <div className="closeButton" onClick={this.handleClick}><i className="fa fa-close"></i></div> : null}
      </section>
    )
  }
}

export default OmniSearch