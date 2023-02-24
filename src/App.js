import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
      .catch(error => {
        console.log(error.response.data)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({ username, password })

    window.localStorage.setItem('loggedBlostlistUser', JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
  }

  if (!user) {
    return (
      <>
        <h1>Login to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <div>
        {user.name} is logged in
      </div>


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App