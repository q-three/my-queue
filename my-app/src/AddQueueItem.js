import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getFriends, selectUser} from './actions/friends'
import {addItem} from './actions/queue'
import SelectFriend from './SelectFriend'
import {Link} from 'react-router-dom'
import OmniSearch from './OmniSearch'

class AddQueueItem extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedType: 'Music',
            desc: '',
            url: '',
            success: false
        }
    }

    componentDidMount(){
        this.props.getFriends(this.props.auth.user.id)
        this.props.selectUser(this.props.auth.user.id)
      }

   changeUser = (e) => {
       this.props.selectUser(e.target.value)
   }

    selectType = (e) => {
        this.setState({
            selectedType: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault()
        const item = {
            id: this.props.friends.selectedUser,
            user_id: this.props.friends.selectedUser,
            referral_id: this.props.auth.user.id,
            desc: this.state.desc,
            url: this.state.url,
            type: this.state.selectedType
        }
        this.props.addItem(item)
        this.setState({
            success: 'Item added!'
        })
    }

    render(){
        return(
            <div className="addQueueItem">
                <header>
                    <Link className="backButton" to='/home'><i className="fa fa-arrow-left"></i></Link>
                </header>
                <form onSubmit={this.submit}>
                    <label htmlFor='friendSrch'>Add For: </label>
                    <select className="selectSearch" name="friendSrch" onChange={this.changeUser}>
                        <option value={this.props.auth.user.id} >{this.props.auth.user.username}</option>
                        {this.props.friends.friends.map(x => {
                           return <SelectFriend value={x.id} username={x.username} key={x.id}/>
                        })}
                    </select>
                <hr />
                <label htmlFor='omniSearch'>Search:</label>
                <OmniSearch name="omniSearch"/>
                <hr/>

                 <label>Didn't find what you wanted? <br/>Add your own.</label>
                <select name='typeSelect' className="selectSearch" placeholder="category" onChange={this.selectType}>
                    <option value="">Category</option>
                    <option value='music'>Music</option>
                    <option value='video'>Video</option>
                    <option value='games'>Games</option>
                    <option value='places'>Places</option>
                    <option value='links'>Check This Out</option>
                </select>   
                <br/><br/>

                <input className='inputBox' type='text' placeholder="description" name='desc' value={this.state.desc} onChange={this.handleChange}></input>
                <input className='inputBox' type='text' placeholder="URL" name='url' value={this.state.url} onChange={this.handleChange}></input>
                <br/><br/>
                <input type='submit' className='btn'></input>
                </form>
                {this.state.success ? <div className="success">{this.state.success}</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      friends: state.friends,
      auth: state.auth
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getFriends, selectUser, addItem}, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddQueueItem)


