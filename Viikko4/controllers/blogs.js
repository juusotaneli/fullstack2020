const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', async (request, response, next) => {
    response.json(await Blog.find({}))
})
blogsRouter.get('/', (request, response, next) => {
    response.send('<h1>tervetullloo :DDD</h1>')
})
blogsRouter.post('/api/blogs', async (request, response, next) => {
    const body = request.body
    let likes = body.likes
    if (!body.title || !body.url) {
        response.status(400).end()
    } else {
        if (!likes) {
            likes = 0
        }
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likes,
        })
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    }
})
blogsRouter.delete('/api/blogs/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    console.log(blog)
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(204).end()
})
module.exports = blogsRouter
