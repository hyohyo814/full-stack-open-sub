const Blog = require('../models/blog')
const User = require('../models/user')
const { errorHandler } = require('../utils/middleware')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const returnedBlog = await Blog.findById(req.params.id)
  if (returnedBlog !== undefined || null) {
    res.json(returnedBlog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  
  const user = await User.findById(decodedToken.id)
  
  if (!blog.title || !blog.url) {
    res.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = new Blog(req.body)

  if (!blog.title || !blog.url) {
    res.status(400).end()
  } else {
    const update = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true
    })
    res.status(200).json(update)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken) {
    return res.status(401).json({ error: 'token invalid' })
  }
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter
