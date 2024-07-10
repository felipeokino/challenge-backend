import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge API',
      version: '1.0.0',
      description: 'This is the API for the challenge',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/**/*.ts'],
};

export const swaggerUIOptions = {
  swaggerOptions: {
    basicAuth: {
      name:   'Authorization',
      schema: {
        type: 'string',
        in:   'header'
      },
      value:  'Bearer <token>'
    }
  }
}
