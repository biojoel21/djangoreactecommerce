import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useAuthStore(state => [
        state.isLoggedIn, 
        state.user
    ])

  
    return (
        <>
            {isLoggedIn()
                ?<div>
                    <div>Dashboard</div>
                    <link to='/'>Logout</link>
                </div>
                :<div>
                    <h1>Home Page</h1>
                    <Link to='/register'>Register</Link>
                    <br/>
                    <Link to='/'>Login</Link>
                </div>
            }
            
        </>
    )
}

export default Dashboard