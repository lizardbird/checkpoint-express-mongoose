const express = require('express')
const parser = require('body-parser')
const Author = require('./db/schema.js')
const app = express()

app.set('port', process.env.PORT || 4000)
app.use(parser.json())

app.get('/authors', (req, res) => {
  Author.find({}).then((authors) => {
    res.json(authors)
  })
})

app.post('/authors', (req, res) => {
  Author.create(req.body.author).then((author) => {
    console.log('posting')
    console.log(req.body)
    res.json(author)
  })
})

app.get('/authors/:id', (req, res) => {
  Author.findOne({id: req.params._id }).then((author) => {
    res.json(author)
  })
})

app.put('/authors/:id', (req, res) => {
  Author.findOneAndUpdate({ id: req.params._id }, req.body, {new: true}).then((author) => {
    res.status(200).json(author)
  })
})

app.delete('/authors/:id', (req, res) => {
  Author.findOneAndRemove( {id: req.params._id}).then(() => {
    res.status(200).send('show deleted')
  })
})

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

module.exports = app
