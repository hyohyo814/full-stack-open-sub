const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/api_test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'admin', passwordHash })

  await user.save()
})

describe('User verification', () => {
  test('Verify user data', async () => {
    await api.get('/api/users').expect(200)
  })

  test('Error validation from invalid username', async () => {
    const impUser = {
      username: 'Te',
      name: 'Test',
      password: 'password'
    }

    const err = await api.post('/api/users').send(impUser)
    expect(err.status).toBe(400)
    expect(err.body.error).toContain('User validation failed: username')

    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(1)
  })

  test('Error validation from invalid password', async () => {
    const impPass = {
      username: 'newUser',
      name: 'James',
      password: '11'
    }

    const err = await api.post('/api/users').send(impPass)
    expect(err.status).toBe(400)
    expect(err.body.error).toContain('Invalid password')

    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(1)
  })

  test('Error validation from missing inputs', async () => {
    const impInp = {
      username: '',
      name: 'Jeff',
      password: ''
    }

    const err = await api.post('/api/users').send(impInp)
    expect(err.status).toBe(400)
    expect(err.body.error).toContain('Username and password are required')

    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(1)
  })
})

describe('Token based authentication', () => {
  test('Verify token generation', async () => {
    const userInfo = {
      username: 'Rouge',
      name: 'John',
      password: 'password'
    }

    const userCreds = {
      username: userInfo.username,
      password: userInfo.password
    }

    await api.post('/api/users').send(userInfo).expect(201)

    const login = await api.post('/api/login').send(userCreds)

    expect(login.status).toBe(200)
    expect(login.body.token).toBeDefined()
  })

  
})

afterAll(async () => {
  await mongoose.connection.close()
})
