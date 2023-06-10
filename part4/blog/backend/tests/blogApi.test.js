const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/api_test_helper')
const api = supertest(app)
const _ = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObj = helper.initBlogs.map((v) => new Blog(v))
  const promiseArr = blogObj.map((blog) => blog.save())
  await Promise.all(promiseArr)
})

////////////////////////////////

describe('API init tests', () => {
  test('Get all blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Blog list length', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initBlogs.length)
  })

  test('Blog list contains specified', async () => {
    const res = await api.get('/api/blogs')

    const nameExp = res.body.map((v) => v.author)
    expect(nameExp).toContain('Michael Chan')
  })

  test('Blog id is defined', async () => {
    const res = await api.get('/api/blogs')

    const identifiers = res.body.map((v) => v.id)
    expect(identifiers).toBeDefined()
  })
})

////////////////////////////////

describe('API POST and content confirmation', () => {
  test('Blog successfully posts and updates', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const title = res.body.map((v) => v.title)

    expect(res.body).toHaveLength(helper.initBlogs.length + 1)
    expect(title).toContain('Type wars')
  })

  test('Blog defaults "likes" to zero when undefined', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0
    }

    const newLength = helper.initBlogs.length + 1
    const newEntry = newLength - 1

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const likesDef = res.body.map((v) => v.likes)
    console.log(likesDef)
    console.log(newLength)

    expect(res.body).toHaveLength(newLength)
    expect(likesDef[newEntry]).toBe(0)
  })

  test('Check required field: url', async () => {
    const noUrl = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: '',
      __v: 0
    }

    await api.post('/api/blogs').send(noUrl).expect(400)
  })

  test('Check required field: title', async () => {
    const noTitle = {
      _id: '5a422bc61b54a676234d17fc',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0
    }

    await api.post('/api/blogs').send(noTitle).expect(400)
  })
})

describe('API testing for individual items in blogs', () => {
  test('Deletion of a blog', async () => {
    const initSize  = helper.initBlogs.length
    const lastIndex = helper.initBlogs.length - 1
    const id = helper.initBlogs[lastIndex]._id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
    
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initSize - 1)
  })

  test('Update of blog likes', async () => {
    const initSize = helper.initBlogs.length

    const updateBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    }

    await api
      .put(`/api/blogs/${updateBlog._id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const res  = await api.get('/api/blogs')
    const idMap = res.body.map(k => k.id)
    const index = _.indexOf(idMap, updateBlog._id)
    const contents = res.body.map(v => v.likes)

    expect(contents[index]).toBe(updateBlog.likes)
    expect(res.body).toHaveLength(initSize)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
