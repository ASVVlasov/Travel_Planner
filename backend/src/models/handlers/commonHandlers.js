const createError = require('http-errors')
const Errors = require('../types/errors')

const compareDates = function (prevDate, nextDate) {
   if (!prevDate || !nextDate) {
      return false
   }
   let prev = prevDate,
      next = nextDate
   if (typeof prev === 'string') {
      prev = new Date(prevDate)
   }
   if (typeof next === 'string') {
      next = new Date(nextDate)
   }
   return prev < next
}
const travelCardsChanged = function (oldCards, newCards) {
   if (oldCards.length !== newCards.length) return true
   let isDifferent = oldCards.find((old, i) => {
      let oldBegin = typeof old.beginDate === 'string' ? new Date(old.beginDate) : old.beginDate
      let newBegin = typeof (newCards[i].beginDate === 'string')
         ? new Date(newCards[i].beginDate)
         : newCards[i].beginDate
      let oldEnd = typeof old.endDate === 'string' ? new Date(old.endDate) : old.endDate
      let newEnd = typeof (newCards[i].endDate === 'string') ? new Date(newCards[i].endDate) : newCards[i].endDate
      return oldBegin - newBegin || oldEnd - newEnd
   })
   return isDifferent
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
   compareDates,
   travelCardsChanged,
   passwordGenerator,
}
