const Schemas = require('./schemas.js')
const CardSwagger = require('./card.swagger.js')
const TravelSwagger = require('./travel.swagger.js')
const UserSwagger = require('./user.swagger.js')
const AuthSwagger = require('./auth.swagger.js')

/* Add-ons */
const authParams = {
   type: 'object',
   properties: {
      login: {
         type: 'string',
         required: true,
         description: 'user login',
      },
      password: {
         type: 'string',
         required: true,
         description: 'user password',
      },
      rememberMe: {
         type: 'boolean',
         description: 'true - чтобы получить куку на месяц и не париться с сессией',
      },
   },
}

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
      {
         name: 'auth',
         description: 'Authorization operations',
      },
   ],
   paths: {
      '/card/': {
         post: CardSwagger.createCard,
         put: CardSwagger.updateCard,
      },
      '/card/{cardId}': {
         delete: CardSwagger.deleteCard,
      },
      '/card/{cardType}/{travelId}': {
         get: CardSwagger.getCategoryInTravel,
      },
      '/card/file/': {
         post: CardSwagger.uploadFile,
         delete: CardSwagger.deleteFile,
      },
      '/card/file/{fileId}': {
         get: CardSwagger.downloadFile,
      },
      '/card/payer/': {
         post: CardSwagger.addPayer,
         put: CardSwagger.updatePayer,
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
      '/travel/user/': {
         post: TravelSwagger.addUser,
         delete: TravelSwagger.removeUser,
      },
      '/user/': {
         get: UserSwagger.getUser,
         put: UserSwagger.updateUser,
         delete: UserSwagger.deleteUser,
      },
      '/user/contact': {
         get: UserSwagger.getContacts,
         post: UserSwagger.addContact,
         delete: UserSwagger.removeContact,
      },
      '/signup': {
         post: AuthSwagger.createUser,
      },
   },
   components: {
      schemas: Schemas,
      authParams: authParams,
   },
}

module.exports = swaggerDocument
