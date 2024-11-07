import React, { useState, useEffect} from 'react'
import { login } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    console.log(email)

    useEffect(() => {
        if(isLoggedIn()) {
            navigate('/dashboard')
        }
    }, [])

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)

        const {error} = login(email, password)
        if(error) {
            alert(error)
        } else {
            navigate('/dashboard')
            resetForm()
        }
        setIsLoading(false)
    }
    
    return (
        <div>
            <h2>Welcome Back!</h2>
            <p>Login to continue...</p>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <br/>
                <input 
                    type="password"
                    name='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> 
                <br/>
                <br/>
                <button type='submit'>Login</button>
                <hr/>
                <Link to='/forgot-password'>Forgot Password</Link>
            </form>
        </div>
    )
}

export default Login