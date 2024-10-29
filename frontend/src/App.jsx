import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './views/auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
