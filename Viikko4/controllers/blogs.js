const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}


blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(b => b.toJSON()))
})
blogsRouter.get('/', (request, response, next) => {
    response.send('<h1>tervetullloo :DDD</h1>')
})
blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body
    let likes = body.likes
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!body.title || !body.url) {
        response.status(400).end()
    } else {
        const user = await User.findById(decodedToken.id)
        if (!likes) {
            likes = 0
        }
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likes,
            user: user._id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    }
})
blogsRouter.delete('/api/blogs/:id', async (request, response) => {
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
