import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.loggedIn)()
    return loggedIn ? <>{children}</> : <Navigate to="/login" />
}

export default PrivateRoute