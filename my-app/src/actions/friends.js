import {request} from '../utils/request'

export const GET_FRIENDS = 'GET_FRIENDS'
export function getFriends(payload){
  console.log(payload)
  return async dispatch => {
    try {
      const response = await request(`/users/u/${payload.userId}/friends`, 'get')
      dispatch({
        type: GET_FRIENDS,
        payload:response
      })
    }catch(err){
      console.error(err)
    }
  }
}

export const GET_ALL_USERS = 'GET_ALL_USERS'
export function getAllUsers(){
  return async dispatch => {
    try{
      const response = await request('/users/u', 'get')
      dispatch({
        type: GET_ALL_USERS,
        payload: response
      })
    }catch(err){
      console.error(err)
    }
  }
}

export const ADD_FRIEND = 'ADD_FRIEND'
export function addFriend(payload){
  return async dispatch => {
    try{
      const response = await request(`/users/u/${payload.userId}/friends`, 'post', {id: payload.friendId})
      dispatch({
        type:ADD_FRIEND,
        payload:response
      })
    }catch(err){
      console.error(err)
    }
  }
}