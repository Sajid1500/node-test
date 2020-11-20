const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

const dbURI = 'mongodb+srv://sajid16:test1234@nodetutor.o7ise.mongodb.net/node-tut?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(morgan('dev'))

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })
  
  blog.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor set kanignam'},
    {title: 'Mario finds eggs', snippet: 'Lorem ipsum dolor set kanignam'},
    {title: 'Luigi finds eggs', snippet: 'Lorem ipsum dolor set kanignam'}
  ]
  res.render('index', {title: 'Home', blogs})
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a new Blog'})
})

app.use((req,res) => {
  res.status(404).render('404', {title: '404'})
})