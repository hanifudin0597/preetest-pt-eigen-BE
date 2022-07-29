/* eslint-disable no-console */
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const { APP_NAME, NODE_ENV, PORT } = require('./src/utils/env')
const borrow = require('./src/router/borrow.router')
const book = require('./src/router/books.route')
const member = require('./src/router/member.route')

const swaggerDocument = require('./apidocs.json')

// deklarasi express
const app = express()

app.use(express.json())
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    })
)
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())

// root router
app.get('/', (req, res) =>
    res.send(
        `${APP_NAME} API - ${NODE_ENV[0].toUpperCase() + NODE_ENV.slice(1)}`
    )
)
// main router

app.use(borrow, book, member)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// 404 router
app.use((req, res) => {
    res.json({
        code: 404,
        payload: 'Resource on that url not found',
        message: 'Not Found',
    })
})

// running server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} with ${NODE_ENV} environment`)
    console.log(`Visit http://localhost:${PORT}`)
})
