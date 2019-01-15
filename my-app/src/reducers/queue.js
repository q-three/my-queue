import {GET_QUEUE} from '../actions/queue'

const initialState = []

export default function queue(state=initialState, {type, payload}){
  switch(type){
    case GET_QUEUE:
      return payload
    default:
      return state
  }
}