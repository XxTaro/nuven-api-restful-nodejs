import swaggerAutogen  from 'swagger-autogen';
const PORT = process.env.PORT || 3000;

const doc = {
  info: {
    title: 'Documentação API desafio técnico - NUVEN',
    version: '1.0.0',
    description: 'Esta é a documentação da API do desafio técnico da NUVEN. \n\n' +
      'A API permite o gerenciamento de usuários, autenticação, upload de datasets, consulta de registros e a criação de queries com inteligência artificial. A API utiliza autenticação JWT para proteger os endpoints. \n\n' +
      'Developed by Gustavo Lopes (ctt.gustavof.lopes@gmail.com)',
    contact: {
      name: 'Gustavo Lopes',
      email: 'ctt.gustavof.lopes@gmail.com'
    }
           },
  host: `localhost:${PORT}`,
  schemes: ['http'],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Insira o seu token JWT no formato: Bearer {token}"
    }
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('swagger-output.json gerado com sucesso');
});