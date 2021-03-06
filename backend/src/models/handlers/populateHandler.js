const PopulateHandler = {
   travelToClient: async function (doc, next) {
      await doc
         .populate({
            path: 'users',
            select: 'nickName avatar name surname middleName email',
         })
         .execPopulate()
      await doc
         .populate({
            path: 'cards',
            populate: [
               { path: 'payers', populate: { path: 'user', select: 'nickName avatar name surname middleName email' } },
               { path: 'files' },
               { path: 'category' },
            ],
         })
         .execPopulate()
      next()
   },
   cardToClient: async function (doc, next) {
      await doc.populate('category').execPopulate()
      await doc
         .populate({
            path: 'payers',
            populate: { path: 'user', select: 'nickName avatar name surname middleName email' },
         })
         .execPopulate()
      await doc.populate('files').execPopulate()
      next()
   },
   userToClient: async function (doc, next) {
      if (!!doc)
         await doc
            .populate({ path: 'contacts', select: 'nickName avatar name surname middleName email' })
            .populate({
               path: 'travels',
               populate: { path: 'users', select: 'nickName avatar name surname middleName email' },
            })
            .execPopulate()
      next()
   },
}

module.exports = PopulateHandler
