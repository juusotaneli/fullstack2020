const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/api/users', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response.status(400).json({ error: 'password too short (min 3 characters)' })

  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
  }

})
usersRouter.put('/api/users/:id', async (request, response, next) => {
  const user = request.body
  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true }).populate('blog', { author: 1, title: 1 })
  response.json(updatedUser.toJSON())
})

usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1})

  response.json(users.map(u => u.toJSON()))

})

module.exports = usersRouter