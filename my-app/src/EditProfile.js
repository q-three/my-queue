import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {editProfile} from './actions/auth'

class EditProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.auth.user.id,
            f_name: '',
            l_name: '',
            img: '',
            error: false, 
        }
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const {id, f_name, l_name, img} = this.state
        this.props.editProfile({id, f_name, l_name, img})
        this.props.history.push('/home')
    }
    
    render(){
        return (
            <div className="editProfile">
                <Link className="backButton" to='/home'><i className="fa fa-arrow-left"></i></Link>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>Edit Profile</h3>
                    <input type="text" name="f_name" placeholder={this.props.auth.user.f_name} required onChange={e => this.handleChange(e)}/>
                    <input type="text" name="l_name" placeholder={this.props.auth.user.l_name} required onChange={e => this.handleChange(e)}/>
                    <input type="url" name="img" placeholder={this.props.auth.user.img || 'add image url'} onChange={e => this.handleChange(e)}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({editProfile}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)