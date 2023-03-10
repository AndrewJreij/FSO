import { useState } from 'react'

const Blog = ({ blog, handleLikeBlog, handleDelete, CurrentUser }) => {
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

  const isCurrentUserCreator = CurrentUser.name === blog.user.name

  return (
    <li style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} {showDetails}
        <button style={hideWhenDetails} onClick={toggleDetails}>view</button>
        <button style={showWhenDetails} onClick={toggleDetails}>hide</button>
      </div>
      <div style={showWhenDetails} className="togglableContent">
        <div className="blogURL">
          {blog.url}
        </div>
        <div className="blogLikes">
          likes {blog.likes}
          <button className="likeButton" onClick={handleLikeBlog}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.user.name}
        </div>
        {isCurrentUserCreator &&
          <div>
            <button onClick={handleDelete}>remove</button>
          </div>}
      </div>
    </li>
  )
}


export default Blog