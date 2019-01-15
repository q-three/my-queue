import {GET_QUEUE, STAR_ITEM, READ_ITEM} from '../actions/queue'
import { stat } from 'fs';

const initialState = {
  items: [],
  filter: ''
}

export default function queue(state=initialState, {type, payload}){
  switch(type){
    case GET_QUEUE:
      return {...state, items: payload}
    case STAR_ITEM:
      const starState = [...state.items]
      const idxS = starState.findIndex(ele => ele.id === payload.id)
      starState[idxS] = payload
      return {...state, items: starState}
    case READ_ITEM:
      const readState = [...state]
      const idxR = readState.findIndex(ele => ele.id === payload.id)
      readState[idxR] = payload
      return {...state, items: readState}
    default:
      return state
  }
}