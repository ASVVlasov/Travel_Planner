const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Travel Planner API",
        version: "1.0.0",
        description: "API for Travel Planner project",
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    servers: [{
        url: "localhost:3000/api-docs/",
        description: "local machine"
    }],
    tags: [{
        name: "developers",
        description: "Operations available to regular front-end developers"
    }]
}

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [path.resolve('.', 'src', 'routes', '*.js')],
}
const swagerSpec = swaggerJSDoc(options)
module.exports = swagerSpec