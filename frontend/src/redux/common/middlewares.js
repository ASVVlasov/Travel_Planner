const sortByCategories = (state, cards) => {
   return cards.filter(
      (card) =>
         (state.tabFilter === 'all' ||
            (card.category &&
               card.category.title ===
                  state.tabs.find((tab) => tab._id === state.tabFilter)
                     .title)) &&
         (!state.userFilter ||
            !!card.payers.find((payer) => payer.user._id === state.userFilter))
   )
}

const sortByTime = (array) => {
   array.sort(
      (prev, next) => Date.parse(prev.beginDate) - Date.parse(next.beginDate)
   )

   let today = new Date()
   let unsorted = array.length - 1
   for (let i = 0; i < unsorted; i++) {
      while (Date.parse(array[i].endDate) < today) {
         array.push(array[i])
         array.splice(i, 1)
         unsorted--
      }
   }
   return array
}

module.exports = {
   sortByCategories,
   sortByTime,
}
