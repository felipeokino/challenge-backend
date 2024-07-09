const swaggerJSDoc = require('swagger-jsdoc');

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge API',
      version: '1.0.0',
      description: 'This is the API for the challenge',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
});
