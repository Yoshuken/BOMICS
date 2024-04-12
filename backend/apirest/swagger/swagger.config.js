module.exports = (api) => {
  // Swagger setup
  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  const swaggerDefinition = {
    openapi: "3.1.0",
    info: {
      title: "BOMIC - Proyecto Final IFCD0111",
      version: "1.0.0",
      description: "API REST Proyecto final IFCD0111 23-24\n Bomic, una aplicacion para organizar tu coleccion de libros online"
    }
  };

  const options = {
    swaggerDefinition,
    apis: ["./swagger/*.js"],
  };

  const swaggerSpec = swaggerJsdoc(options);
  api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};