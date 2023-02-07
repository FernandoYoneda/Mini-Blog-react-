import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// ele mapeia se a autenticação do usuário foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useState, useEffect } from 'react'
import { useAuthetication } from './hooks/useAuthentication'

// - Páginas
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './Login/Login'
import Register from './register/Register'
import Search from './pages/Search/Search'

// - Componentes
import NavBar from './component/NavBar'
import Footer from './component/Footer'

// - Context
import { AuthProvider } from './context/AuthContext'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthetication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        setUser(user)
      },
      [auth],
    )
  })

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
