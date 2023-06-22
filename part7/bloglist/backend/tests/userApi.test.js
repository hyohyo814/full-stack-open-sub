const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const User = require('../models/user');
const Blog = require('../models/blog');
const helper = require('../utils/api_test_helper');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', name: 'admin', passwordHash });

  await user.save();

  await Blog.deleteMany({});

  const blogObj = helper.initBlogs.map((v) => new Blog(v));
  const promiseArr = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArr);
});

describe('User verification', () => {
  test('Verify user data', async () => {
    await api.get('/api/users').expect(200);
  });

  test('Error validation from invalid username', async () => {
    const impUser = {
      username: 'Te',
      name: 'Test',
      password: 'password',
    };

    await api.post('/api/users').send(impUser).expect(400);

    const res = await api.get('/api/users');
    expect(res.body).toHaveLength(1);
  });

  test('Error validation from invalid password', async () => {
    const impPass = {
      username: 'newUser',
      name: 'James',
      password: '11',
    };

    await api.post('/api/users').send(impPass).expect(400);

    const res = await api.get('/api/users');
    expect(res.body).toHaveLength(1);
  });

  test('Error validation from missing inputs', async () => {
    const impInp = {
      username: '',
      name: 'Jeff',
      password: '',
    };

    const resInit = await api.get('/api/users');
    const initLength = resInit.body.length;

    await api
      .post('/api/users')
      .send(impInp)
      .expect(400)
      .expect({ error: 'Username and password are required' });

    const res = await api.get('/api/users');
    expect(res.body).toHaveLength(initLength);
  });
});

describe('Token based authentication', () => {
  const userInfo = {
    username: 'Rouge',
    name: 'John',
    password: 'password',
  };

  const userCreds = {
    username: userInfo.username,
    password: userInfo.password,
  };

  test('Verify token generation', async () => {
    await api.post('/api/users').send(userInfo).expect(201);

    const login = await api.post('/api/login').send(userCreds);

    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });

  test('Allowing posting of notes with valid token', async () => {
    const newBlog = {
      title: 'Blogtest 3',
      author: 'Ben',
      url: 'https://recBlog.net',
      likes: 5,
    };

    const init = await api.get('/api/blogs');
    const initLength = init.body.length;
    // console.log(initLength)

    await api.post('/api/users').send(userInfo);
    const login = await api.post('/api/login').send(userCreds);
    const { token } = login.body;
    const badToken = `${token}asd`;

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${badToken}`)
      .expect(401);

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(initLength + 1);
    const titles = res.body.map((t) => t.title);
    expect(titles).toContain(newBlog.title);
  });

  test('Deletion function available only to owner of blog', async () => {
    const newBlog = {
      title: 'Blogtest 3',
      author: 'Ben',
      url: 'https://recBlog.net',
      likes: 5,
    };

    await api.post('/api/users').send(userInfo);
    const login = await api.post('/api/login').send(userCreds);
    const { token } = login.body;
    // console.log(token);

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const res = await api.get('/api/blogs');
    const newEntry = res.body[res.body.length - 1];
    const newEntryId = newEntry.id;
    const initLength = res.body.length;
    // console.log(newEntry);
    // console.log(newEntryId);

    await api
      .delete(`/api/blogs/${newEntryId}`)
      .expect(401)
      .expect({ error: 'jwt must be provided' });

    const failRes = await api.get('/api/blogs');
    expect(failRes.body).toHaveLength(initLength);

    await api
      .delete(`/api/blogs/${newEntryId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const succRes = await api.get('/api/blogs');
    expect(succRes.body).toHaveLength(initLength - 1);
  }, 10000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
