const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog post', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }

  await api
    .get('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const contents = res.body.map((v) => v.content)

  expect(contents).toContain(
    'Michael Chan'
  )
})
