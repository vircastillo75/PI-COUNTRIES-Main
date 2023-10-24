const request = require('supertest');
const express = require('express');
const router = require('../src/routes/index'); 
const app = express();

app.use(express.json());
app.use('/', router);

describe('API Routes', () => {
  it('should get a list of countries', async () => {
    const response = await request(app).get('/countries');
    expect(response.status).toBe(200);
   
  });

  it('should get a country by ID', async () => {
    const response = await request(app).get('/countries/ARG'); 
    expect(response.status).toBe(200);
  
  });
});

