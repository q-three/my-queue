import {GET_QUEUE, STAR_ITEM} from '../actions/queue'

const initialState = []

export default function queue(state=initialState, {type, payload}){
  switch(type){
    case GET_QUEUE:
      return payload
    case STAR_ITEM:
      const newState = [...state]
      const idx = newState.findIndex(ele => ele.id === payload.id)
      newState[idx] = payload
      return newState
    default:
      return state
  }
}