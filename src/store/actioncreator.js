import { SET_USER } from './actiontype'


export const setUser = (user) => {
    return {
        type : SET_USER,
        // payload is the global state
        payload : {
            currentUser : user
        }
    }

}