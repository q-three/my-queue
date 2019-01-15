import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logout} from './actions/auth'
import {bindActionCreators} from 'redux'
import {getFriends} from './actions/friends'
import SelectFriend from './SelectFriend'
import {Link} from 'react-router-dom'


class AddQueueItem extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedFriend: 0
        }
    }

    componentDidMount(){
        this.props.getFriends(this.props.auth.user.id)
      }

    selectFriend = (id) => {
        this.setState({
            selectedFriend: id
        })
    }

    clicker = () => {
        console.log(this.props.friends)
    }

    render(){
        return(
            <div className="addQueueItem">
                <Link className="backButton" to='/home'><i className="fa fa-arrow-left"></i></Link>
                <form>
                    <h3>Add Recommendation to a Friend's Queue</h3><br/><br/>
                    <label htmlFor='friendSrch'>Add For: </label>
                    <select className="friendSearch" name="friendSrch">
                        {/* {this.state.friends.map(x => {
                            return <option value={x.username}> <SelectFriend selectFriend={() => this.selectFriend(x.id)} img={x.img} username={x.username}/></option>
                        })} */}
                    </select>
                    
                    <br/><br/><br/>
                    <label htmlFor='typeSelect'>Category</label>    
                    <select name='typeSelect' className="friendSearch">
                        <option value='music'>Music</option>
                        <option value='food'>Food</option>
                        <option value='news'>News</option>
                        <option value='video'>Video</option>
                        <option value='generic'>Check This Out</option>
                    </select>   
                    <br/><br/>

                    <input className='inputBox' type='text' placeholder='description'></input>
                    <input className='inputBox' type='text' placeholder="url"></input>
                    <br/><br/>
                    <input type='submit' className='btn'></input>
                </form>
                <button className='btn' onClick={this.clicker}>HERE</button>
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
    return bindActionCreators({getFriends}, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddQueueItem)


