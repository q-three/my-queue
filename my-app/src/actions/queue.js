import {request} from '../utils/request'

export const GET_QUEUE = 'GET_QUEUE'
export function getQueue(id){
  return async dispatch => {
    try{
      const response = await request(`/users/u/${id}/queue`)
      dispatch({
        type:GET_QUEUE,
        payload: response
      })
    }catch(err){
      console.error(err)
    }
  }
}

export const STAR_ITEM = 'STAR_ITEM'
export function starItem(userId, itemId){
  return async dispatch => {
    try{
      const [response] = await request(`/queue/${itemId}`, 'put')
    
      dispatch({
        type:STAR_ITEM,
        payload:response
      })
    }catch(err){
      console.error(err)
    }
  }
}

export const READ_ITEM = 'READ_ITEM'
export function readItem(id){
  return async dispatch => {
    try{
      const [response] = await request(`/queue/${id}/read`, 'put')
      dispatch({
        type: READ_ITEM,
        payload: response
      })
    }catch(err){}
  }
}


export const ADD_ITEM = 'ADD_ITEM'
export function addItem(item){
  return async dispatch => {
    console.log('ITEM HERE: ', item)
    try{
      const response = await request('/queue', 'post', item)
      dispatch({
        type: ADD_ITEM,
        payload: response
      })
    } catch(err) {

    }

export const FILTER = 'FILTER'
export function filter(val){
  return {
    type: FILTER,
    payload: val

  }
}