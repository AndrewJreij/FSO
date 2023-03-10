import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        handleNewBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h1>create new</h1>

            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        id="titleInput"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        id="authorInput"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        id="urlInput"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit" id="blog-submit-button">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    handleNewBlog: PropTypes.func.isRequired
}

export default BlogForm