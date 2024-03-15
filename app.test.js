const request = require('supertest');
const { app } = require('./server');

describe('Testes da rota /enviar', () => {
  it('Deve enviar um e-mail com sucesso', async () => {
    const response = await request(app)
      .post('/enviar')
      .send({
        nome: 'Nome do remetente',
        email: 'email@exemplo.com',
        celular: '123456789',
        mensagem: 'Mensagem de teste'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Mensagem enviada com sucesso!');
  });
});