import { SET_AUTHENTICATION, LOG_IN, LOG_OUT, SIGN_UP , EDIT_PROFILE} from '../actions/auth'
import { require } from 'util';

const initialState  = {
    pending: true,
    user: null,
    error: null,
    success: null
}

export default function auth(state=initialState, {type, payload}){
    switch(type){
        case SET_AUTHENTICATION:
            if (!payload) return state
            if (payload.response && payload.response.data && payload.response.data.message) {
                if (payload.response.data.message === "Couldn't find it, bruh") return {...state, pending: false}
                return { ...state, pending: false, user: null, error: payload.response.data.message }
            }
            return {pending: false, user: payload, error: null, success: null}
        case LOG_IN:
            if(payload.response && payload.response.data && payload.response.data.message){
                return {...state, pending: false, error: payload.response.data.message}
            }
            localStorage.setItem('token', payload.token)
            return {...state, pending: false, user:payload.user}
        case LOG_OUT:
            return {...initialState, pending:false}
        case SIGN_UP:
            if (payload.response && payload.response.data && payload.response.data.message) {
                return { ...state, pending: false, success: null, error: payload.response.data.message }
            }        
            return {...state, pending: false, error: null, success: payload.message}
        case EDIT_PROFILE:
            if (payload.response && payload.response.data && payload.response.data.message) {
                return { ...state, pending: false, success: null, error: payload.response.data.message }
            }
            return { ...state, pending: false, error: null, user: payload }
        default:
            return state
    }
}