import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logOut} from './actions/auth'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import Queue from './Queue'
import FilterOptions from './FilterOptions'

class ProtectedPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            filterOpen: false
        }
    }
    handleLogOut = () => {
        localStorage.clear()
        this.props.logOut()
        this.props.history.push('/')
    }

    handleClick = () => {
        this.setState({
            filterOpen: !this.state.filterOpen
        })
    }

    render(){
        const user = this.props.auth.user
        return(
            <div className="home">
                <header style={{backgroundColor: `${user.color ? user.color : '#ccc' }`}}>
                    <div className='accountActions'>
                        <Link to='/edit-profile'>
                            <i className="fa fa-cog"></i>
                        </Link>
                        <p className='logout' onClick={this.handleLogOut}>Log Out</p>
                    </div>
                    <div className="greeting">
                        <div className="letter" 
                            style={{ 
                                backgroundImage: `url("${user.img}")`, 
                                borderColor: `${user.color ? user.color : '#ccc'}` 
                            }}>{user.img ? null : user.f_name[0].toUpperCase()}</div>
                        <p>Welcome, {user.f_name}.</p>    
                    </div>
                </header>
                <div className="button">
                    <Link to='/friends'>
                        <i className="fa fa-users"></i>
                    </Link>
                </div>
                <div onClick={this.handleClick} className="button">
                    <i className="fa fa-filter"></i>
                </div>
                {this.state.filterOpen ? <FilterOptions handleClick={this.handleClick}/> : null}
                <div className="button">
                <Link to='/addItem'>
                    <i className="fa fa-plus"></i>
                 </Link>
                </div>
                <Queue/>
                <footer></footer>
            </div>
        )
    }
}

const mapStateToProps = state => ({auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({logOut}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedPage)
