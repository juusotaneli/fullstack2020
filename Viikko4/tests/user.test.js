const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const User = require('../models/user')


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'juuso',
            name: 'Juuso Karvonen',
            password: 'salainen',
        }

        await api
            .post('/')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        console.log(usersAtStart)

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })
})
describe('user creation when the database is empty', () => {
    test('creation fails when username is not given', async () => {
        const usersAtStart = await helper.usersInDb()

        console.log(usersAtStart)

        const newUser = {
            name: 'Esa',
            password: 'salainen',
        }

        const result = await api
            .post('/')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })
    test('creation fails when username is given but the password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        console.log(usersAtStart)

        const newUser = {
            username: 'Esa99',
            name: 'Esa',
            password: 'sa',
        }

        const result = await api
            .post('/')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password too short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })
    test('creation fails when username is given but the password is not given', async () => {
        const usersAtStart = await helper.usersInDb()

        console.log(usersAtStart)

        const newUser = {
            username: 'Esa99',
            name: 'Esa',
        }

        const result = await api
            .post('/')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password too short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })
})

afterAll(() => {
    mongoose.connection.close()
})
