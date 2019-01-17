import {createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import auth from './reducers/auth'
import friends from './reducers/friends'
import queue from './reducers/queue'
const reducers = combineReducers({auth, friends, queue})

export default createStore(reducers, applyMiddleware(thunk, logger))