import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import './App.css'
import authService from "./appwrite/auth"
import { Footer, Header } from './components'
import { login, logout } from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  if (loading) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center bg-paper'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-line border-t-forest' />
      </div>
    )
  }

  return (
    <div className='flex min-h-screen w-full flex-col bg-paper'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App