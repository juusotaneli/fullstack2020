const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Jääkiekko-opus",
        author: "Maito Poika",
        url: "www.valio.fi",
        likes: 0
    },
    {
        title: "Vihdat - syväanalyysi vihtakulttuurista Suomessa",
        author: "V. Virtanen",
        url: "www.vihta.fi",
        likes: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())

}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}