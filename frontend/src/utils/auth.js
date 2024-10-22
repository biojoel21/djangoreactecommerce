import { useAuthStore } from '../store/auth'
import axios from './axios'
import jwt_decode from 'jwt-decode'
import Cookie from 'js-cookie'

export const login = async (email, password) => {
    try {
        const { data, status } = await axios.post('user/token/', { 
            email, 
            password 
        })        
        if (status === 200) {
            setAuthUser(data.access, data.refresh)

            //Alert user that login was successful
        }
        return { data, error: null }
    } catch (error) {
        return { 
            data: null, 
            error: error.response.data?.detail || 'Something went wrong'
        };
    }
} 


export const register = async (full_name, email, phone, password, password2) => {
    try {
        const { data } = await axios.post('user/register/', {
            full_name,
            email,
            phone,
            password,
            password2
        })

        await login(email, password)

        //Alert user that registration was successful
        return { data, error: null }
    } catch (error) {
        return { 
            data: null, 
            error: error.response.data?.detail || 'Something went wrong'
        };
    }
}

export const logout = () => {
    Cookie.remove('access_token')
    Cookie.remove('refresh_token')
    useAuthStore.setState.setUser(null)
}