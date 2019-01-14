import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getFriends, getAllUsers, addFriend} from './actions/friends'
import UserResult from './UserResult'

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
    console.log(this.props)
    const normQuery = this.state.query.toLowerCase()
    const normF_name = ele.f_name.toLowerCase()
    const normL_name= ele.l_name.toLowerCase()
    const normUsername = ele.username.toLowerCase()
    return (normUsername.includes(normQuery) || normF_name.includes(normQuery) || normL_name.includes(normQuery)) && ele.id !== this.props.auth.user.id 
  }

  addFriend = (id) => {
    return this.props.addFriend({userId: this.props.auth.user.id, friendId:id})
  }

  render(){
    return (
      <div>
        <header>
          <input 
            onFocus={this.handleFocus} 
            onChange={e => this.handleChange(e)}
            className="friendSearch" 
            type="text" 
            placeholder="search for friends..."
          />
          {this.state.searching ? <div className="searchResults">{this.props.friends.users.filter(this.byQuery).map((user, i) => <UserResult addFriend={() => this.addFriend(user.id)} key={i} {...user}/>)}</div> : null}
        </header>
        <main> 
          {this.props.friends.friends.length ? <div>friends</div> : <p className="emptyState">You don't have any friends yet :(</p>}
        </main>
        {this.state.searching ? <div className="gradientScreen"></div> : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({friends: state.friends, auth:state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({getFriends, getAllUsers, addFriend}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Friends)