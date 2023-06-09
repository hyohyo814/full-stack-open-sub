const blogsRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const returnedBlog = await Blog.findById(req.params.id);
  if (returnedBlog !== undefined || null) {
    res.json(returnedBlog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const blog = new Blog(req.body);

  // console.log(req.user)
  const { user } = req;
  blog.user = user.id;
  // console.log(blog)

  if (!blog.title || !blog.url) {
    res.status(400).end();
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    res.status(201).json(savedBlog);
  }
});

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const blog = new Blog(req.body);

  const { user } = req;
  blog.user = user.id;

  if (!blog.title || !blog.url) {
    res.status(400).end();
  } else {
    const update = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.status(200).json(update);
  }
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const targetBlog = await Blog.findById(req.params.id);
  // console.log(targetBlog)
  const targetUser = await User.findById(targetBlog.user.id);
  const targetUserId = targetUser.id.toString();
  // console.log(`target ID ${targetUserId}`)

  const { user } = req;
  const userId = user.id.toString();

  // console.log(`user ID ${userId}`)
  if (userId !== targetUserId) {
    res.status(401).json({ error: 'user not authorized to delete this blog' });
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = blogsRouter;
