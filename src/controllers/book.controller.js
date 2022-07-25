/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const bookModel = require('../models/book.model')

const borrowController = {
    listBook: async (req, res) => {
        try {
            await bookModel
                .list()
                .then((result) => {
                    res.json({
                        code: 200,
                        status: 'success',
                        data: result.rows,
                        message: 'get All books success',
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        code: 500,
                        status: 'failed',
                        data: null,
                        message: 'get All books failed',
                    })
                })
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: 'Internal service error',
            })
        }
    },
}

module.exports = borrowController
