import { useAuthStore } from '../store/auth'
import axios from './axios'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

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
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    //useAuthStore.setState().setUser(null) #codigo orignal del video mal escrito
    useAuthStore.setState({ user: null })
    //Alert user that logout was successful

}

export const setUser = async () => {
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    if(!accessToken || !refreshToken) {
        return;
    }

    if(isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    }else{
        setAuthUser(accessToken, refreshToken)
    }
    
}

export const setAuthUser = (accessToken, refreshToken) => {    
    Cookies.set('access_token', accessToken, { 
        expires: 1,
        secure: true
    })
    
    Cookies.set('refresh_token', refreshToken, {
        expires: 7,
        secure: true
    })

    const user = jwt_decode(accessToken) ?? null

    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)
}

export const refreshToken = async () => {
    const refreshToken = Cookies.get('refresh_token')
    const response = await axios.post('user/token/refresh/', {
        refresh: refreshToken
    })

    return response.data
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken)
        return decodedToken.exp < Date.now() / 100
    } catch (error) {
        console.log(error);
        return true
    }
}