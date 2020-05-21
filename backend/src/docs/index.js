const Schemas = require('./schemas.js')
const CardSwagger = require('./card.swagger.js')
const TravelSwagger = require('./travel.swagger.js')
const UserSwagger = require('./user.swagger.js')

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
      '/card/{cardType}/{travelId}': {
         get: CardSwagger.getCategoryInTravel,
      },
      '/card/file/': {
         post: CardSwagger.uploadFile,
         delete: CardSwagger.deleteFile,
      },
      '/card/file/{fileName}': {
         get: CardSwagger.downloadFile,
      },
      '/card/payer/': {
         post: CardSwagger.addPayer,
         delete: CardSwagger.removePayer,
      },
      '/travel/{travelId}': {
         get: TravelSwagger.getTravel,
         delete: TravelSwagger.deleteTravel,
      },
      '/travel/': {
         post: TravelSwagger.createTravel,
         put: TravelSwagger.updateTravel,
      },
      '/user/': {
         post: UserSwagger.createUser,
         get: UserSwagger.getSelf,
         put: UserSwagger.updateUser,
         delete: UserSwagger.deleteUser,
      },
      '/user/{userId}': {
         get: UserSwagger.getUser,
      },
      '/user/contact': {
         get: UserSwagger.getSelfContacts,
         put: UserSwagger.addContact,
         delete: UserSwagger.removeContact,
      },
   },
   components: {
      schemas: Schemas,
   },
}

module.exports = swaggerDocument
