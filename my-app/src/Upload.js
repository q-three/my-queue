import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import {uploadImage} from './actions/auth'

class Upload extends Component{
  constructor(props){
    super(props)
    this.state={
      file: false
    }
  }

  handleSubmit = (e) => { 
    e.preventDefault()
    const formData = new FormData();
    formData.append("image", e.target.file.files[0]);
    return axios.post(`${process.env.REACT_APP_BASE_URL}/upload/${this.props.auth.user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response)
      this.props.uploadImage(response.data[0])
      this.props.history.push('/home')
    })
  }

  handleChange = (e) => {
    this.setState({
      file: e.target.files[0].name
    })
  }

  render(){
    return (
      <section className="upload">
        <Link className="backButton" to='/home'><i className="fa fa-arrow-left"></i></Link>
        <form onSubmit={e => this.handleSubmit(e)}>
          <h3>Upload</h3>
          <hr/>
          <div className="fileUpload">
            <input name='file' type="file" onChange={e => {this.handleChange(e)}}/>
            <div className="fakeButton"> {this.state.file ? this.state.file : 'choose a file...'}</div>
          </div>
          <br/>
          <input type="submit" value="submit"/>
        </form>
      </section>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({uploadImage}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Upload)