import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import {signup} from './actions/auth'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            f_name: '',
            l_name: '',
            username: '',
            password: '',
            passwordMatch: '',
            errorState: false,
            errorMessage: ''
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    checkVals(){
        if( this.state.f_name.length > 0 
            && this.state.l_name.length > 0
            && this.state.username.length > 0
            && this.state.password.length >= 8
            && this.state.passwordMatch === this.state.password) return true
            return false
    }

    handleSubmit = async(e) => {
        e.preventDefault()
        const {f_name, l_name, username, password, passwordMatch} = this.state
        const body = { f_name, l_name, username, password, passwordMatch }
        return axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`, body)
        .then(response => {
            this.props.signup(response.data)
            this.props.history.push('/')
        })
        .catch(err => {
            this.props.signup(err)
        })
    }

    render(){
        return (
            <div className="signup">
                <div className="loginHeader">
                    <img src="img/logo.png" alt="myQueue logo" />
                    <h1>myQueue</h1>
                </div>
                <form id="signup" onSubmit={(e) => this.handleSubmit(e)}>
                    <input id="f_name" type="text" placeholder="first name" maxLength="50" required onChange={(e) => this.handleChange(e)}/>
                    <input id="l_name" type="text" placeholder="last name" maxLength="50" required onChange={(e) => this.handleChange(e)}/>
                    <input id="username" type="text" placeholder="username" required onChange={(e) => this.handleChange(e)}/>
                    <input id="password" type="password" placeholder="password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={(e) => this.handleChange(e)}/>
                    <input id="passwordMatch" type="password" placeholder="retype password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        required onChange={(e) => this.handleChange(e)}/>
                    <input value="submit" id="submit" type="submit" disabled={this.checkVals() ? false : true} />
                    {this.state.password !== this.state.passwordMatch 
                        ? <span className="passwordWarning">Passwords do not match</span>
                        : ''
                    }
                </form>
                <p className="actions">Already a member? <Link to='/login'>Login</Link></p>
                {this.props.auth.error ? <div className="warning">{this.props.auth.error}</div> : null}
                {this.props.auth.success ? <div className="success">{this.props.auth.success}</div> : null} 
            </div>
        )
    }
}

const mapStateToProps = state => ({auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({signup}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)