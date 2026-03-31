const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Pedidos API',
      version: '1.0.0',
      description: 'API REST para sistema de pedidos',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
      { url: 'https://sistema-pedidos-backend-z6y3.onrender.com', description: 'Produção' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
