const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('id field doesnt contain "_"', async () => {
  const res = await api.get('/api/blogs')
  const id = res.body[0].id
  expect(id).toBeDefined()

})
test('blogs can be added', async () => {
  const newBlog =
  {
    title: "Kukkienhoito",
    author: "S. Eppo",
    url: "www.kukkamies.fi",
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const b = await helper.blogsInDb()
  expect(b.length).toBe(helper.initialBlogs.length + 1)
  expect(b[2].title).toContain("hoito")

})
afterAll(() => {
  mongoose.connection.close()
})
test('if likes is null amount of likes is set to zero', async () => {
  const newBlog =
  {
    title: "Kukkienhoito",
    author: "S. Eppo",
    url: "www.kukkamies.fi",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const b = await helper.blogsInDb()
  expect(b[2].likes).toBe(0)

})
test('if the title is null or the url is null new blog is not added', async () => {
  const newBlog1 =
  {
    title: "Kukkienhoito",
    author: "S. Eppo",
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog1)
    .expect(400)

  const b = await helper.blogsInDb()
  expect(b.length).toBe(2)

})
test('blogs can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
  const title = blogsAtEnd.map(r => r.title)
  expect(title).not.toContain(blogToDelete.title)
})
test('blogs can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 57

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(204)
  
  const blogsInTheEnd = await helper.blogsInDb()

  expect(blogsInTheEnd[0].likes).toBe(57)

})
