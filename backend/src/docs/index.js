const Schemas = require('./schemas.js')
const CardSwagger = require('./card.swagger.js')
const TravelSwagger = require('./travel.swagger.js')

const swaggerDocument = {
   openapi: '3.0.0',
   info: {
      title: 'Travel Planner API',
      version: '1.0.0',
      description: 'API for Travel Planner project',
      license: {
         name: 'Apache 2.0',
         url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
   },
   servers: [
      {
         url: '/',
         description: 'local machine (localhost:3300/)',
      },
   ],
   tags: [
      {
         name: 'card',
         description: 'Operations with travel card',
      },
      {
         name: 'travel',
         description: 'Operations with travel deck',
      },
      {
         name: 'user',
         description: 'Operations with service users',
      },
   ],
   paths: {
      '/card/': {
         post: CardSwagger.createCard,
         put: CardSwagger.updateCard,
      },
      '/card/{cardId}': {
         get: CardSwagger.getCard,
         delete: CardSwagger.deleteCard,
      },
      '/card/uploadFile': {
         post: CardSwagger.uploadFile,
      },
      '/card/downloadFile/{fileName}': {
         get: CardSwagger.downloadFile,
      },
      '/card/deleteFile': {
         post: CardSwagger.deleteFile,
      },
      '/card/addUser': {
         post: CardSwagger.addUser,
      },
      'card/removeUser': {
         delete: CardSwagger.removeUser,
      },
      '/travel/{travelId}': {
         get: TravelSwagger.getTravel,
         delete: TravelSwagger.deleteTravel,
      },
      '/travel/{cardType}/{travelId}': {
         get: TravelSwagger.getCategoryInTravel,
      },
      '/travel/': {
         post: TravelSwagger.createTravel,
         put: TravelSwagger.updateTravel,
      },
   },
   components: {
      schemas: Schemas,
   },
}

module.exports = swaggerDocument
