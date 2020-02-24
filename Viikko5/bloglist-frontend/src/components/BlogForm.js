import React, { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createNewBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <form id='form' onSubmit={addBlog}>
        <div >
          title
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='urlComponent'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default BlogForm
