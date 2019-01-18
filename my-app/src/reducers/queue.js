import {GET_QUEUE, STAR_ITEM, READ_ITEM, FILTER, ADD_ITEM, DELETE_ITEM} from '../actions/queue'

const initialState = {
  items: [],
  filter: '',
  message: ''
}

export default function queue(state=initialState, {type, payload}){
  switch(type){
    case GET_QUEUE:
      return {...state, items: payload}
    case STAR_ITEM:
      const starState = [...state.items]
      const idxS = starState.findIndex(ele => ele.id === payload.id)
      starState[idxS].starred = payload.starred
      return {...state, items: starState}
    case READ_ITEM:
      const readState = [...state.items]
      const idxR = readState.findIndex(ele => ele.id === payload.id)
      readState[idxR].read = payload.read
      return {...state, items: readState}
    case ADD_ITEM:
      const newItems = state.items.concat(payload[0])
      return {...state, newItems}
    case FILTER:
      if (state.filter === payload) return {...state, filter: ''}
      return {...state, filter: payload}
    case DELETE_ITEM:
      const itemsLeft = state.items.filter(x => x.id !== payload.result.id)
      return {...state, items: itemsLeft}
    default:
      return state
  }
}