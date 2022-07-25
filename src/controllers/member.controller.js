/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const memberModel = require('../models/member.model')

const memberController = {
    listMember: async (req, res) => {
        try {
            await memberModel
                .list()
                .then((result) => {
                    res.json({
                        code: 200,
                        status: 'success',
                        data: result.rows,
                        message: 'get All member success',
                    })
                })
                .catch((err) => {
                    res.json({
                        code: 500,
                        status: 'failed',
                        data: null,
                        message: 'get All member failed',
                    })
                })
        } catch (error) {
            res.json({ code: 500, message: 'Internal service error' })
        }
    },
}

module.exports = memberController
