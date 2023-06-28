import { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notificaion'
import Menu from './components/Menu'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const exists = localStorage.getItem('loggedInUser')
    if (exists) {
      setToken(exists)
    }
  }, [])
  
  return (
    <div>
      <Menu setPage={setPage} setToken={setToken} token={token} />
      <LoginForm setToken={setToken} show={page === 'login'} setPage={setPage} />
      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'user'} />
    </div>
  )
}

export default App