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