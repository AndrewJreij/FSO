import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState()

    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('')


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
                console.log(error.response.data.error)
            })
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            setMessageClass('success')
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
            setUser(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (error) {

            setMessageClass('error')
            setMessage(error.response.data.error)
            setTimeout(() => setMessage(null), 5000)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
    }

    const handleNewBlog = async (blog) => {
        try {
            const newBlog = await blogService.create(blog)
            //set user manually to show user in new blog without refreshing page, exercise 5.8
            newBlog.user = user
            setBlogs(blogs.concat(newBlog))

            setMessageClass('success')
            setMessage(`new blog ${newBlog.title} by ${newBlog.author} added`)
            setTimeout(() => setMessage(null), 5000)
        } catch (error) {
            setMessageClass('error')
            setMessage(error.response.data.error)
            setTimeout(() => setMessage(null), 5000)
        }
    }

    const handleLike = async (blog) => {
        try {
            blog.likes += 1

            const returnedBlog = await blogService.update(blog)
            returnedBlog.user = user
            setBlogs(blogs.map(n => n.id !== returnedBlog.id ? n : returnedBlog))

        } catch (error) {
            setMessageClass('error')
            setMessage(error.response.data.error)
            setTimeout(() => setMessage(null), 5000)
        }
    }

    const handleDeleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.deleteBlog(blog.id)
                const newBlogs = blogs.filter(n => n.id !== blog.id)
                setBlogs(newBlogs)
            }
            catch (error) {
                setMessageClass('error')
                setMessage(error.response.data.error)
                setTimeout(() => setMessage(null), 5000)
            }
        }
    }

    const sortByLikes = (event) => {
        event.preventDefault()
        let sortedBlogs = [...blogs]
        sortedBlogs.sort((a, b) => a.likes - b.likes)
        setBlogs(sortedBlogs);
    }

    if (!user) {
        return (
            <>
                <h1>Login to application</h1>
                <Notification message={message} className={messageClass} />
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

            <Notification message={message} className={messageClass} />

            <div>
                {user.name} is logged in

                <button onClick={handleLogout}>logout</button>
            </div>

            <div>
                <Togglable buttonLabel='create'>
                    <BlogForm handleNewBlog={handleNewBlog} />
                </Togglable>
            </div>

            <div>
                <button onClick={sortByLikes}>sort</button>
            </div>


            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleLikeBlog={() => handleLike(blog)} handleDelete={() => handleDeleteBlog(blog)} />
            )}
        </div>
    )
}

export default App