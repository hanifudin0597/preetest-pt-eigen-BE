const express = require('express')
const { borrowBook, returnBook } = require('../controllers/borrow.controller')

const route = express.Router()

route.post('/borrow-book', borrowBook).delete('/return-book', returnBook)

module.exports = route
