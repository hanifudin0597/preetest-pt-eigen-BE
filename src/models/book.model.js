// eslint-disable-next-line prettier/prettier
const db = require('../config/db');

const bookModel = {
    updateQtyBook: (codeBook) =>
        new Promise((resolve, reject) => {
            db.query(
                `UPDATE books SET stock = stock-1 WHERE code='${codeBook}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    updateStockBook: (codeBook) =>
        new Promise((resolve, reject) => {
            db.query(
                `UPDATE books SET stock = stock+1 WHERE code='${codeBook}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    checkStockBook: (codeBook) =>
        new Promise((resolve, reject) => {
            db.query(
                `SELECT stock FROM books WHERE code='${codeBook}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    list: () =>
        new Promise((resolve, reject) => {
            db.query(`SELECT * FROM books WHERE stock > 0`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        }),
}

module.exports = bookModel
