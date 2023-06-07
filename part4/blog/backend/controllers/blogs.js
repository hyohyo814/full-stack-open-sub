const Blog = require('../models/blog')
const blogsRouter = require('express').Router()


blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id).then(returnedBlog => {
        if (returnedBlog) {
            res.json(returnedBlog)
        } else {
            res.status(404).end()
        }
    })
    .catch((err) => next(err))
})

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog)
    })
    .catch((err) => {
      next(err)
    })
})

blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end()
    })
    .catch((err) => next(err))
})

module.exports = blogsRouter