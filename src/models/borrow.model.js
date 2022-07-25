// eslint-disable-next-line prettier/prettier
const db = require('../config/db');

const borrowModel = {
    store: (codeBook, codeName, qty, dateBorrow = new Date()) =>
        new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO borrows (code_name, code_book, qty, date_borrow) VALUES ($1, $2, $3, $4)`,
                [codeName, codeBook, qty, dateBorrow],
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    checkMember: (codeName) =>
        new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM borrows WHERE code_name='${codeName}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    checkBook: (codeBook) =>
        new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM borrows WHERE code_book='${codeBook}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    returnBook: (codeName, codeBook) =>
        new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM borrows WHERE code_name='${codeName}' AND code_book='${codeBook}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    getDateBorrow: (codeName, codeBook) =>
        new Promise((resolve, reject) => {
            db.query(
                `SELECT date_borrow FROM borrows WHERE code_name='${codeName}' AND code_book='${codeBook}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    checkPinalty: (dateBorrow) =>
        new Promise((resolve, reject) => {
            const dateReturn = new Date()
            db.query(
                `SELECT ($1::date - $2::date) AS days;`,
                [dateReturn, dateBorrow],
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    deleteBorrow: (codeName, codeBook) =>
        new Promise((resolve, reject) => {
            db.query(
                `DELETE FROM borrows WHERE code_name='${codeName}' AND code_book='${codeBook}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
}

module.exports = borrowModel
