import axios from 'axios'
import {setUser} from "../reducers/userReducer";

export const registration = (email, password) => {
    return async dispatch => {
        console.log(email, password)
        try {
            const response = await axios.post(`https://master43.ru:8443/api/auth/registration`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            console.log(response.data)
            console.log(response.data.user)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://master43.ru:8443/api/auth/login`, {
                email,
                password
            })
            console.log(response.data)
            dispatch(setUser(response.data.user))

            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e)
            alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://master43.ru:8443/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response)
        } catch (e) {
            //alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
export const ChangAccountInformation =  (email, password,phone) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://master43.ru:8443/api/auth/changeacc`, {
                Firsttoken:`${localStorage.getItem('token')}`,
                email,
                password,
                phone
            })
            dispatch(setUser(response.data.user))
            //localStorage.setItem('token', response.data.token)
            console.log(response.data)
        } catch (e) {
            //alert(e.response.data.message)
            //localStorage.removeItem('token')
        }
    }
}