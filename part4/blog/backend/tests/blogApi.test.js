const mongoose = require('mongoose');
const supertest = require('supertest');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const app = require('../app');
const helper = require('../utils/api_test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

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

describe('API init tests', () => {
  test('Get all blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Blog list length', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(helper.initBlogs.length);
  });

  test('Blog list contains specified', async () => {
    const res = await api.get('/api/blogs');

    const nameExp = res.body.map((v) => v.author);
    expect(nameExp).toContain('Michael Chan');
  });

  test('Blog id is defined', async () => {
    const res = await api.get('/api/blogs');

    const identifiers = res.body.map((v) => v.id);
    expect(identifiers).toBeDefined();
  });
});

describe('API POST and content confirmation', () => {
  const userInfo = {
    username: 'Rouge',
    name: 'John',
    password: 'password',
  };

  const userCreds = {
    username: userInfo.username,
    password: userInfo.password,
  };

  test('Blog defaults "likes" to zero when undefined', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0,
    };

    await api.post('/api/users').send(userInfo);
    const login = await api.post('/api/login').send(userCreds);
    const { token } = login.body;

    const newLength = helper.initBlogs.length + 1;
    const newEntry = newLength - 1;

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const likesDef = res.body.map((v) => v.likes);
    // console.log(likesDef);
    // console.log(newLength);

    expect(res.body).toHaveLength(newLength);
    expect(likesDef[newEntry]).toBe(0);
  });

  test('Check required field: url', async () => {
    const noUrl = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: '',
      __v: 0,
    };

    await api.post('/api/users').send(userInfo);
    const login = await api.post('/api/login').send(userCreds);
    const { token } = login.body;

    await api
      .post('/api/blogs')
      .send(noUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('Check required field: title', async () => {
    const noTitle = {
      _id: '5a422bc61b54a676234d17fc',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0,
    };

    await api.post('/api/users').send(userInfo);
    const login = await api.post('/api/login').send(userCreds);
    const { token } = login.body;

    await api
      .post('/api/blogs')
      .send(noTitle)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('API testing for individual items in blogs', () => {
  const userInfo = {
    username: 'Rouge',
    name: 'John',
    password: 'password',
  };

  const userCreds = {
    username: userInfo.username,
    password: userInfo.password,
  };
  test('Update of blog likes', async () => {
    const initSize = helper.initBlogs.length;

    const newBlog = {
      title: 'Blogtest 3',
      author: 'Ben',
      url: 'https://recBlog.net',
      likes: 5,
    };

    await api.post('/api/users').send(userInfo);
    const login = await api.post('/api/login').send(userCreds);
    const { token } = login.body;

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const checkpoint = await api.get('/api/blogs');
    const newId = checkpoint.body[initSize].id;
    // console.log(newId);

    const updateBlog = {
      title: 'Blogtest 3',
      author: 'Ben',
      url: 'https://recBlog.net',
      likes: 8,
      id: newId,
    };

    await api
      .put(`/api/blogs/${newId}`)
      .send(updateBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const idMap = res.body.map((k) => k.id);
    const index = _.indexOf(idMap, updateBlog.id);
    const contents = res.body.map((v) => v.likes);

    expect(contents[index]).toBe(updateBlog.likes);
    expect(res.body).toHaveLength(initSize);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
