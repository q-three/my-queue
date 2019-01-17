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
            color: '',
            error: false, 
        }
    }
    
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {id, f_name, l_name, img, color} = this.state
        const body = {id, f_name, l_name}
        if(color) body.color = color
        if(img) body.img = img
        this.props.editProfile(body)
        this.props.history.push('/home')
    }

    render(){
        return (
            <div className="editProfile">
                <header style={{
                    backgroundColor: `${this.props.auth.user.color ? this.props.auth.user.color : '#ccc'}`}}>
                    <Link className="backButton" to='/home'><i className="fa fa-arrow-left"></i></Link>
                </header>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>Edit Profile</h3>
                    <hr/>
                    <input type="text" name="f_name" placeholder={this.props.auth.user.f_name} onChange={e => this.handleChange(e)}/>
                    <input type="text" name="l_name" placeholder={this.props.auth.user.l_name} onChange={e => this.handleChange(e)}/>
                    <div className="imageInput">
                        <input type="url" name="img" placeholder={this.props.auth.user.img || 'add image url'} onChange={e => this.handleChange(e)}/>
                        <Link to='/upload'><button className="uploadImage">Upload</button></Link>
                    </div>
                    <div className="colorInput">
                        <input name="color" type="color" onBlur={e => this.handleChange(e)} onKeyUp={e => this.handleChange(e)} onClick={e => this.handleChange(e)}/>
                        <div className="fakeButton">
                            <p>Select a color</p>
                            <div className="colorHolder" style={{backgroundColor: this.state.color}}></div>
                        </div>
                    </div>
                        <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({editProfile}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)