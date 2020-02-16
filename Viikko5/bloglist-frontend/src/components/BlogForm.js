import React, { useState } from 'react'

const BlogForm = React.forwardRef(({ createNewBlog }, ref) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createNewBlog({
            title: title,
            author: author,
            url: url,
        })
        console.log(title + ' ' + author)
        setAuthor('')
        setTitle('')
        setUrl('')
    }
    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>

    )
})


export default BlogForm
