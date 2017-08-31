const Author = require('./schema')
const mongoose = require('mongoose')
const connect = require('./connection')
const authorSeeds = require('./seedAuthors')

Author.remove({})
.then(_ => Author.collection.insert(authorSeeds))
.then(author => {
  console.log(author)
  process.exit()
})
.catch((err) => {
  console.log(err)
  process.exit()
})
