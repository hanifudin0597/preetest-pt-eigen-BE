const express = require('express')
const { listBook } = require('../controllers/book.controller')

const route = express.Router()

route.get('/list-book', listBook)

module.exports = route
