import {request} from '../utils/request'
// import axios from 'axios'

export const SET_AUTHENTICATION = 'SET_AUTHENTICATION'
export function setAuthentication(claim){
    return {
        type:SET_AUTHENTICATION,
        payload:claim.user
    }
}

export const LOG_IN = 'LOG_IN'
export function logIn(payload){
    return {
            type: LOG_IN,
            payload
        }
}


export const LOG_OUT = 'LOG_OUT'
export function logOut(){
    return {
        type: LOG_OUT
    }
}

export const SIGN_UP = 'SIGN_UP'
export function signup(payload){
    return{
            type: SIGN_UP,
            payload
        }
        
}

export const EDIT_PROFILE = 'EDIT_PROFILE'
export function editProfile(payload){
    return async dispatch => {
        try{
            const [response] = await request(`/users/u/${payload.id}/`, 'put', payload)
            delete response.password
            dispatch({
                type: EDIT_PROFILE,
                payload: response
            })    
        }catch(err){
            console.error(err)
        }
    }
}

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
export function uploadImage(payload){
    return{
        type: UPLOAD_IMAGE,
        payload
    }
}