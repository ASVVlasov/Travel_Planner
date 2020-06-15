const createError = require('http-errors')
const Errors = require('../types/errors')

const compareDates = function (prevDate, nextDate) {
   if (!prevDate || nextDate) {
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

module.exports = { compareDates }
