/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const borrowModel = require('../models/borrow.model')
const bookModel = require('../models/book.model')
const memberModel = require('../models/member.model')

const borrowController = {
    borrowBook: async (req, res) => {
        try {
            const { codeBook, codeMember } = req.body

            const checkMember = await borrowModel.checkMember(codeMember)

            const checkBook = await borrowModel.checkBook(codeBook)

            const checkStockBook = await bookModel.checkStockBook(codeBook)

            const checkPinalty = await memberModel.checkPinalty(codeMember)

            const countkPinalty = await memberModel.countkPinalty(
                checkPinalty.rows[0].penalty
            )

            if (checkStockBook.rows[0].stock > 0) {
                if (checkMember.rowCount >= 1) {
                    res.json({
                        code: 500,
                        status: 'failed',
                        data: null,
                        message: 'Hanya boleh meminjam 1 buku per orang',
                    })
                } else if (countkPinalty.rows[0].days > 0) {
                    res.json({
                        code: 500,
                        status: 'failed',
                        data: null,
                        message: `Waktu hukuman penalty kamu masih ${countkPinalty.rows[0].days} hari`,
                    })
                } else if (checkBook.rowCount >= 1) {
                    res.json({
                        code: 500,
                        status: 'failed',
                        data: null,
                        message: 'Buku telah dipinjam oleh orang lain',
                    })
                } else {
                    const qty = 1
                    await borrowModel
                        .store(codeBook, codeMember, qty)
                        .then((result) => {
                            res.json({
                                code: 200,
                                status: 'success',
                                data: null,
                                message: 'Sukses meminjam buku ',
                            })
                        })
                        .catch((err) => {
                            res.json({
                                code: 500,
                                status: 'failed',
                                data: null,
                                message: 'Gagal meminjam buku ',
                            })
                        })
                    await bookModel.updateQtyBook(codeBook)
                }
            } else {
                res.json({
                    code: 500,
                    status: 'failed',
                    data: null,
                    message: 'Stock buku habis',
                })
            }
        } catch (error) {
            res.json({ code: 500, message: 'Internal service error' })
        }
    },
    returnBook: async (req, res) => {
        try {
            const { codeBook, codeMember } = req.body
            const returnBook = await borrowModel.returnBook(
                codeMember,
                codeBook
            )

            if (!returnBook.rowCount) {
                res.json({
                    code: 500,
                    status: 'failed',
                    data: null,
                    message:
                        'Buku yang dikembalikan harus sama dengan buku yang dipinjam',
                })
            } else {
                const getDateBorrow = await borrowModel.getDateBorrow(
                    codeMember,
                    codeBook
                )
                const checkPinalty = await borrowModel.checkPinalty(
                    getDateBorrow.rows[0].date_borrow
                )

                if (checkPinalty.rows[0].days > 7) {
                    await borrowModel
                        .deleteBorrow(codeMember, codeBook)
                        .then(async (result) => {
                            res.json({
                                code: 200,
                                status: 'success',
                                data: null,
                                message:
                                    'Sukses mengembalika buku dan Karena kamu melebihi 7 hari peminjaman kamu terkan penalty tidak bisa pinjam buku lagi selama 3 hari',
                            })
                            await memberModel.pinalty(codeMember)
                        })
                        .catch((err) => {
                            res.json({
                                code: 500,
                                status: 'failed',
                                data: null,
                                message: 'gagal mengembalikan buku',
                            })
                        })
                    await bookModel.updateStockBook(codeBook)
                    // await memberModel.pinalty(codeMember)
                } else {
                    await borrowModel
                        .deleteBorrow(codeMember, codeBook)
                        .then((result) => {
                            res.json({
                                code: 200,
                                status: 'success',
                                data: null,
                                message: 'Sukses mengembalika buku',
                            })
                        })
                    await bookModel.updateStockBook(codeBook)
                }
            }
        } catch (error) {
            res.json({ code: 500, message: 'Internal service error' })
        }
    },
}

module.exports = borrowController
