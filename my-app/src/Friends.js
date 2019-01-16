import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import {getFriends, getAllUsers, addFriend} from './actions/friends'
import UserResult from './UserResult'
import FriendListItem from './FriendListItem'

class Friends extends Component{
  constructor(props){
    super(props)
    this.state ={
      searching: false,
      query: ''
    }
  }

  componentDidMount(){
    this.props.getFriends(this.props.auth.user.id)
    return this.props.getAllUsers()
  }

  handleFocus = () => {
    this.setState({
      searching: !this.state.searching
    })

  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  byQuery = (ele) => {
    const normQuery = this.state.query.toLowerCase()
    const normF_name = ele.f_name.toLowerCase()
    const normL_name= ele.l_name.toLowerCase()
    const normUsername = ele.username.toLowerCase()
    return (normUsername.includes(normQuery) || normF_name.includes(normQuery) || normL_name.includes(normQuery)) && ele.id !== this.props.auth.user.id 
  }

  // NOTE: worst case time complexity is O(n^2); may need refactoring
  byFriends = (ele) => {
    let found = false
    const friendsList = this.props.friends.friends
    for(let i = 0; i < friendsList.length; i++){
      if(friendsList[i].username === ele.username){
        found = true
        break
      }
    }
    if(!found) return true
    return false
  }

  addFriend = (id) => {
    return this.props.addFriend({userId: this.props.auth.user.id, friendId:id})
    .then(this.props.getFriends(this.props.auth.user.id))
     
  }

  render(){
    return (
      <div>
        <header>
          <Link className="backButton" to='/home'><i className="fa fa-arrow-left"></i></Link>
        </header>
          <input 
            onFocus={this.handleFocus} 
            onChange={e => this.handleChange(e)}
            className="friendSearch" 
            type="text" 
            placeholder="search for friends..."
          />
          {this.state.searching ? <div className="searchResults">{this.props.friends.users.filter(this.byFriends).filter(this.byQuery).map((user, i) => <UserResult addFriend={() => this.addFriend(user.id)} key={i} {...user}/>)}</div> : null}
        <hr/>
        <main className="friendsList"> 
          {this.props.friends.friends.length ? this.props.friends.friends.map((friend, i) => <FriendListItem key={i} {...friend}/>) : <p className="emptyState">You don't have any friends yet :(</p>}
        </main>
        {this.state.searching ? <div className="gradientScreen"></div> : null}
        {this.state.searching ? <div className="closeButton" onClick={this.handleFocus}><i className="fa fa-close"></i></div> : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({friends: state.friends, auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({getFriends, getAllUsers, addFriend}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Friends)