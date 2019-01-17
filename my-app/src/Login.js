import React, {Component} from 'react'
import { logIn } from './actions/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const body ={
            username: this.state.username,
            password: this.state.password
        }

        return axios.post (process.env.REACT_APP_BASE_URL + '/auth/token', body)
            .then(response => {
                this.props.logIn(response.data)
                this.props.history.push('/home')
            })
            .catch(err => {
                this.props.logIn(err)
            })
        }

    render(){
        return(
            <div className="login">
                <div className="loginHeader">
                    <img src="img/logo.png" alt="myQueue logo"/> 
                    <h1>myQueue</h1>
                </div>
                <form id="login" onSubmit={(e) => this.handleSubmit(e)}>
                    <input id="username" type="text" placeholder="username" required onChange={(e) => this.handleChange(e)}/>
                    <input id="password" type="password" placeholder="password" minLength="8" required onChange={(e) => this.handleChange(e)}/>
                    <input value="submit" id="submit" type="submit" disabled={
                        (this.state.username.length > 1 && this.state.password.length >= 8) 
                        ? false 
                        : true}/>
                </form>
                <p className="actions">Not a member? <Link to='/signup'>Signup</Link></p>
               {this.props.auth.error ? <div className="warning">{this.props.auth.error}</div> : null}
                {this.props.auth.success ? <div className="success">{this.props.auth.success}</div> : null} 
            </div> 
        )
    }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ logIn }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)