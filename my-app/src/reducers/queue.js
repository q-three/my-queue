import {GET_QUEUE, STAR_ITEM, READ_ITEM} from '../actions/queue'

const initialState = []

export default function queue(state=initialState, {type, payload}){
  switch(type){
    case GET_QUEUE:
      return payload
    case STAR_ITEM:
      const starState = [...state]
      const idxS = starState.findIndex(ele => ele.id === payload.id)
      starState[idxS] = payload
      return starState
    case READ_ITEM:
      const readState = [...state]
      const idxR = readState.findIndex(ele => ele.id === payload.id)
      readState[idxR] = payload
      return readState
    default:
      return state
  }
}