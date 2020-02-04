const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0) 
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((currentBlog, nextBlog) => currentBlog.likes <= nextBlog.likes ? nextBlog : currentBlog, blogs[0])
}
module.exports = {
    dummy, totalLikes, favoriteBlog
}

