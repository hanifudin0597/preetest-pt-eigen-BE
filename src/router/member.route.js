const express = require('express')
const { listMember } = require('../controllers/member.controller')

const route = express.Router()

route.get('/list-member', listMember)

module.exports = route
