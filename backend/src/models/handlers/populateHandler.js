const PopulateHandler = {
   travelToClient: async function (doc, next) {
      await doc
         .populate({
            path: 'users',
            select: 'nickName avatar',
         })
         .execPopulate()
      await doc
         .populate({
            path: 'cards',
            populate: [
               { path: 'payers', populate: { path: 'user', select: 'nickName avatar' } },
               { path: 'files' },
               { path: 'category' },
            ],
         })
         .execPopulate()
      next()
   },
   cardToClient: async function (doc, next) {
      await doc.populate('category').execPopulate()
      await doc.populate({ path: 'payers', populate: { path: 'user', select: 'nickName avatar' } }).execPopulate()
      await doc.populate('files').execPopulate()
      next()
   },
   userToClient: async function (doc, next) {
      await doc.populate({ path: 'contacts', select: 'nickName avatar' }).execPopulate()
      next()
   },
}

module.exports = PopulateHandler
