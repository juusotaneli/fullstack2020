const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(b => b.toJSON()))
})
blogsRouter.get('/api/blogs/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog.toJSON())
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
            user: user,
            visible: body.visible,
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    }
})
blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)


    console.log(decodedToken.id)
    console.log(blog.user._id)

    if (String(decodedToken.id) === String(blog.user._id)) {
        await Blog.findByIdAndDelete(blog.id)
        user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
        await user.save()
        response.status(200).end()
    } else {
        return response.status(401).json({ error: 'tokens do not match' })
    }

})
blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
    const blog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog.toJSON())
})
module.exports = blogsRouter
