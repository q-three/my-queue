import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EditProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            f_name: this.props.f_name,
            l_name: this.props.l_name,
            oldPassword: '',
            newPassword: '',
            passwordMatch: '',
            error: false
        }
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.peventDefault()
        const {f_name, l_name, oldPassword, newPassword, passwordMatch} = this.state
        if(newPassword !== passwordMatch ) this.setState({error: "Passwords don't match"})
        if(!oldPassword || !newPassword || !passwordMatch) return {f_name, l_name}
        if(f_name && l_name && oldPassword && newPassword && passwordMatch) return {f_name, l_name, password: newPassword, passwordMatch}

    }
    componentDidMount(){

    }

    render(){
        return (
            <div className="editProfile">
                <Link to='/home'><i className="fa fa-arrow-left"></i></Link>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>Edit Profile</h3>
                    <input type="text" name="f_name" value={this.props.f_name} required onChange={e => this.handleChange(e)}/>
                    <input type="text" name="l_name" value={this.props.l_name} required onChange={e => this.handleChange(e)}/>
                    <input type="password" name="oldPassword" placeholder="confirm old password..." required onChange={e => this.handleChange(e)}/>
                    <input type="password" name="newPassword" placeholder="new password..." required onChange={e => this.handleChange(e)}/>
                    <input type="password" name="passwordMatch" placeholder="type new password again..." required onChange={e => this.handleChange(e)}/>
                    <input type="file" name="img" required/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default EditProfile