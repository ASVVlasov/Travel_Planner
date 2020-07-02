const createError = require('http-errors')
const Errors = require('../types/errors')

const compareDates = function (prevDate, nextDate) {
   if (!prevDate || !nextDate) {
      return false
   }
   let prev, next
   if (typeof prevDate === 'string') {
      prev = new Date(prevDate)
   }
   if (typeof nextDate === 'string') {
      next = new Date(nextDate)
   }
   return prev < next
}

const passwordGenerator = function (length) {
   let password = ''
   const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()/_+='
   for (let i = 0; i < length; i++) {
      password += Alphabet[Math.floor(Math.random() * Alphabet.length)]
   }
   return password
}

module.exports = { compareDates, passwordGenerator }
