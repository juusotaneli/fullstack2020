import React from 'react'

const BlogForm = ({
    createNewBlog,
    setTitle,
    setAuthor,
    setUrl,
    title,
    author,
    url
}) => {
    return (

        <div>

            <form onSubmit={createNewBlog}>
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

}
export default BlogForm
