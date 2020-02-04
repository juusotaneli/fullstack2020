const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs, blogsInDb
}