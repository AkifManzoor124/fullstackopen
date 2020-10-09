const blogRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  try{
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0, 
      user: user._id,
      comments: ["comment", "comment"]
    })
    console.log("POST MADE", blog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }catch(e){
    console.log("error")
    return response.status(401).json({ error: 'Could not create new blog' })
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const id = request.params.id
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)

  if(blog.user.toString() === user.id.toString()){
    const result = await Blog.findByIdAndRemove(id)
    response.json()
  }
})

blogRouter.put('/:id', async(request, response) => {
  
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments
  }

  try{
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true} )
    response.json(result)
  }catch(e){
    response.status(404).end()
  }
    
})

module.exports = blogRouter