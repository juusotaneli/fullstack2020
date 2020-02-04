const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    
})
blogsRouter.get('/', (request, response, next) => {
    response.send('<h1>tervetullloo :DDD</h1>')
})

blogsRouter.post('/api/blogs', (request, response, next) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})
module.exports = blogsRouter
