import { useState } from 'react'

const Blog = ({ blog, handleLikeBlog, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const hideWhenDetails = { display: showDetails ? 'none' : '' }
  const showWhenDetails = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} {showDetails}
        <button style={hideWhenDetails} onClick={toggleDetails}>view</button>
        <button style={showWhenDetails} onClick={toggleDetails}>hide</button>
      </div>
      <div style={showWhenDetails}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleLikeBlog}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button onClick={handleDelete}>remove</button>
        </div>
      </div>
    </div>
  )
}


export default Blog