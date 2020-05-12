const Schemas = require('./schemas.js')
const Card = require('./card.swagger.js')

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
      '/card/uploadFile': Card.uploadFile,
      '/card/dropFile': Card.dropFile,
      '/card/{travelId}': Card.createCard,
      '/card/{travelID}': Card.getAllCards,
      '/card/{travelId}/{cardId}': Card.getCard,
      '/card/': Card.updateCard,
      '/card/{travelID}/{cardId}': Card.deleteCard,
   },
   components: {
      schemas: Schemas,
   },
}

module.exports = swaggerDocument
