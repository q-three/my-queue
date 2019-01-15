import {GET_QUEUE, STAR_ITEM, READ_ITEM, FILTER, ADD_ITEM} from '../actions/queue'


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
      const newItems = state.items.push(payload)
      return {...state, newItems}
    case FILTER:
      if (state.filter === payload) return {...state, filter: ''}
      return {...state, filter: payload}
    case ADD_ITEM: 
        return {...state, message: payload}
    default:
      return state
  }
}