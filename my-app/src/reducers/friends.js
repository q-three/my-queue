import {GET_FRIENDS, GET_ALL_USERS, ADD_FRIEND, SELECT_USER} from '../actions/friends'

const initialState = {
  friends: [],
  users: [],
  selectedUser: null,
  success: null
}

export default function(state=initialState, {type, payload}){
  switch(type){
    case GET_FRIENDS: 
      if(payload.response && payload.response.data) return state
      return {...state, friends: payload}
    case GET_ALL_USERS:
      return {...state, users: payload}
    case ADD_FRIEND:
      const newFriends = [payload, ...state.friends]

      return {...state, friends: newFriends}
    case SELECT_USER:
      return {...state, selectedUser: payload}
    default:
      return state
  }
}