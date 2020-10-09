
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const api = supertest(app)
jest.useFakeTimers()

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('verifying id', async () => {
    const response = await api.get('/api/blogs')
    ids = response.body.map(blog => blog.hasOwnProperty('id'))
    console.log(ids)

    expect(ids).toBeDefined()
})

test('verify POST request', async () => {
    const listWithOneBlog =
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Adil W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }

    const response = await api.get('/api/blogs')
    const initialContent = response.body

    await api
        .post('/api/blogs')
        .send(listWithOneBlog)
        .set({Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlzaDEyNCIsImlkIjoiNWY2YjVkYzBhNGZjNDk1MDQ0ZDQ0Y2Y5IiwiaWF0IjoxNjAwODkxODYwfQ.cynOOaml4ykbsouw-FTyLhrzGVhhRV_rQ6cH71gkdZU'})
        .expect(201)


    const newResponse = await api.get('/api/blogs')
    const updatedContent = newResponse.body
    expect(updatedContent).toHaveLength(initialContent.length + 1)
    expect(updatedContent[0].title).toContain('Go To Statement Considered Harmful')
})

test('check for likes', async () => {


    const response = await api.get('/api/blogs')
    const content = response.body

    const arr = content.map((blog) => {
        return blog.hasOwnProperty('likes')
    })

    arr.forEach(element => {
        expect(element).toBe(true)
    });
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: "Jarold",
        url: "www.go.com",
        likes: "55"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlzaDEyNCIsImlkIjoiNWY2YjVkYzBhNGZjNDk1MDQ0ZDQ0Y2Y5IiwiaWF0IjoxNjAwODkxODYwfQ.cynOOaml4ykbsouw-FTyLhrzGVhhRV_rQ6cH71gkdZU'})
        .expect(400)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
    const newBlog = {
        title: "Har",
        author: "Jarold",
        likes: "55"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlzaDEyNCIsImlkIjoiNWY2YjVkYzBhNGZjNDk1MDQ0ZDQ0Y2Y5IiwiaWF0IjoxNjAwODkxODYwfQ.cynOOaml4ykbsouw-FTyLhrzGVhhRV_rQ6cH71gkdZU'})
        .expect(400)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close
})
