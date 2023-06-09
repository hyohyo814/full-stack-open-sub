const Blog = require('../models/blog')
const { errorHandler } = require('../utils/middleware')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
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
  
  if (!blog.title || !blog.url) {
    res.status(400).end()
  } else {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const removal = await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

module.exports = blogsRouter
