const createError = require('http-errors')
const Errors = require('../types/errors')

const Dates = {
   _convert: function (prevDate, nextDate) {
      let prev = prevDate,
         next = nextDate
      if (typeof prev === 'string') {
         prev = new Date(prevDate)
      }
      if (typeof next === 'string') {
         next = new Date(nextDate)
      }
      return { prev, next }
   },
   compare: function (prevDate, nextDate) {
      if (!prevDate || !nextDate) {
         return false
      }
      const { prev, next } = this._convert(prevDate, nextDate)
      prev.setUTCHours(0, 0, 0, 0)
      next.setUTCHours(0, 0, 0, 0)
      return prev < next
   },
   isEqual: function (prevDate, nextDate) {
      const { prev, next } = this._convert(prevDate, nextDate)
      return !(prev - next)
   },
}

const passwordGenerator = function (length) {
   let password = ''
   const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()/_+='
   for (let i = 0; i < length; i++) {
      password += Alphabet[Math.floor(Math.random() * Alphabet.length)]
   }
   return password
}

module.exports = {
   Dates,
   passwordGenerator,
}
