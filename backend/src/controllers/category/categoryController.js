const CategoryModel = require('../../models/category')

class CategoryController {
   static async getCategoryById(categoryId) {
      return await CategoryModel.findById(categoryId).lean()
   }
}

module.exports = CategoryController
