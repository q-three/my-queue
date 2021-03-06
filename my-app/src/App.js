import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Login from './Login'
import Signup from './Signup'
import ProtectedPage from './ProtectedPage'
import AuthenticatedRoute from './AuthenticatedRoute'
import {request} from './utils/request'
import {setAuthentication} from './actions/auth'
import EditProfile from './EditProfile'
import Friends from './Friends'
import AddQueueItem from './AddQueueItem'
import Upload from './Upload'

class App extends Component {
    componentDidMount() {
        request('/auth/token')
            .then(response => this.props.setAuthentication(response))
            .catch(err => this.props.setAuthentication(err))
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <AuthenticatedRoute path='/home' component={ProtectedPage}/>
                    <AuthenticatedRoute path='/edit-profile' component={EditProfile}/>
                    <AuthenticatedRoute path='/friends' component={Friends}/>
                    <AuthenticatedRoute path='/addItem' component={AddQueueItem}/>
                    <AuthenticatedRoute path='/upload' component={Upload}/>
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Login}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => ({auth: state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({ setAuthentication}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
