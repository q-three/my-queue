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
      results: false,
      success: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: '',
      success: false
    })

    try{
      if(this.state.type === '') throw new Error('Select a category')
      return request(`/search/${this.state.type}`, 'post', {query: this.state.query})
      .then(response => {
        this.setState({
          results: response
        })
      })
    }catch(err){
      if(e.target.name === 'query'){
        this.setState({
          error:'Select a category'
        })
      }
    }
  }

  handleClick = () => {
    this.setState({
      query: '',
      results: false
    })
  }

  successReset = () => {
    if(!this.state.success){
      this.setState({
        success: 'Item added!'
      })
    }
    else this.setState({
      success: false
    })
  }

  render() {
    return (
      <section className="omniSearchHolder">
        <div className="omniSearch">
          <select name="type" className="omniSelect" onChange={(e) => this.handleChange(e)}>
            <option value="">category</option>
            <option value="music">Music</option>
            <option value="video">Video</option>
            <option value="games">Games</option>
            <option value="places">Places</option>
          </select>
          <input name="query" type="text" className="omniInput" placeholder='search...' onChange={(e) => this.handleChange(e)}/>
        </div>
        {this.state.results ? <SearchResults handleClick={this.handleClick} successReset={this.successReset} type={this.state.type} results={this.state.results}/> : null}
        {this.state.error === '' ? null : <div className="warning">{this.state.error}</div>}
        {this.state.results ? <div className="closeButton" onClick={this.handleClick}><i className="fa fa-close"></i></div> : null}
        {this.state.success ? <div className="success">{this.state.success}</div> : null}
      </section>
    )
  }
}

export default OmniSearch