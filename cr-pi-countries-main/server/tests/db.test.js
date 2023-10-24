const request = require('supertest');
const app = require('../src/server');// Importa la aplicación de tu servidor (donde configuraste tus rutas)

describe('API Routes', () => {
  it('should get a list of countries', async () => {
    const response = await request(app).get('/countries'); // Realiza una solicitud GET a la ruta /countries
    expect(response.status).toBe(200);
  });


  it('should get a list of activities', async () => {
    const response = await request(app).get('/activities'); // Realiza una solicitud GET a la ruta /activities
    expect(response.status).toBe(200); // Verifica que la respuesta tenga un código de estado 200
  });
  

});
