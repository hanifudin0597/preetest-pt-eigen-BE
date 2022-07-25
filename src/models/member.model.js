// eslint-disable-next-line prettier/prettier
const db = require('../config/db');

const bookModel = {
    list: () =>
        new Promise((resolve, reject) => {
            db.query(
                `SELECT members.name, borrows.qty, books.title, books.author FROM members LEFT JOIN borrows ON members.code = borrows.code_name LEFT JOIN books ON borrows.code_book = books.code`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    pinalty: (codeMember) =>
        new Promise((resolve, reject) => {
            db.query(
                `UPDATE members SET penalty=now() + INTERVAL '1 day' WHERE code='${codeMember}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    checkPinalty: (codeMember) =>
        new Promise((resolve, reject) => {
            db.query(
                `SELECT penalty FROM members WHERE code='${codeMember}'`,
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
    countkPinalty: (penalty) =>
        new Promise((resolve, reject) => {
            const dateNow = new Date()
            db.query(
                `SELECT ($1::date - $2::date) AS days;`,
                [penalty, dateNow],
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        }),
}

module.exports = bookModel
