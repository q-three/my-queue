import {GET_FRIENDS, GET_ALL_USERS, ADD_FRIEND} from '../actions/friends'

const initialState = {
  friends: [],
  users: []
}

export default function(state=initialState, {type, payload}){
  switch(type){
    case GET_FRIENDS: 
      if(payload.response && payload.response.data) return state
      return {...state, friends: payload}
    case GET_ALL_USERS:
      return {...state, users: payload}
    case ADD_FRIEND:
      return state
    default:
      return state
  }
}