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
         url: 'localhost:3000/api-docs/',
         description: 'local machine',
      },
   ],
   tags: [
      {
         name: 'developers',
         description: 'Operations available to regular front-end developers',
      },
   ],
   paths: {
      '/card/uploadFile': {
         post: CardSwagger.uploadFile,
      },
      '/card/dropFile': {
         post: CardSwagger.dropFile,
      },
      '/card/{travelId}': {
         post: CardSwagger.createCard,
         get: CardSwagger.getAllCards,
      },
      '/card/{travelId}/{cardId}': {
         get: CardSwagger.getCard,
         delete: CardSwagger.deleteCard,
      },
      '/card/': {
         put: CardSwagger.updateCard,
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
