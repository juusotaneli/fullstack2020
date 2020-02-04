const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Nahkaesat",
    author: "Esa Nahka",
    url: "www.nahka.fi",
    likes: 0
  },
  {
    title: "Virtsa",
    author: "V. Virtanen",
    url: "www.virtsa.fi",
    likes: 0
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
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
afterAll(() => {
  mongoose.connection.close()
})