const bcrypt = require('bcrypt')
const User = require('../models/users')
const helper = require('./helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
jest.useFakeTimers()

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const saltRounds = 10
        const passwordHash = await bcrypt.hash('sekret', saltRounds)
        const user = new User({username: 'root', passwordHash})
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/js/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLenght(usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
})

describe('validation tests', () => {

    test('check for invalid users', async () => {

        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(503)
    })
})