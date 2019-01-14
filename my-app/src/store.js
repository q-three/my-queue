import {createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import auth from './reducers/auth'
import friends from './reducers/friends'
const reducers = combineReducers({auth, friends})

export default createStore(reducers, applyMiddleware(logger, thunk))