const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Importe a função que deseja testar
const enviarEmail = require('./server');

// Crie uma instância do aplicativo Express
const app = express();

// Use o body-parser para analisar o corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Defina a rota /enviar com a função que você deseja testar
app.post('/enviar', enviarEmail);

// Descreva seus testes usando Jest
describe('Testes da rota /enviar', () => {
    test('Deve enviar e-mail corretamente', async () => {
        // Simule uma requisição POST com dados do formulário
        const response = await request(app)
            .post('/enviar')
            .send({
                nome: 'Teste',
                email: 'teste@example.com',
                celular: '123456789',
                mensagem: 'Teste de mensagem'
            });

        // Verifique se a resposta é bem-sucedida
        expect(response.status).toBe(200);
        expect(response.text).toBe('Mensagem enviada com sucesso!');
    });

    test('Deve retornar erro ao enviar e-mail', async () => {
        // Substitua o envio de e-mail por uma função que lança um erro
        // ...

        // Simule uma requisição POST com dados do formulário
        const response = await request(app)
            .post('/enviar')
            .send({
                nome: 'Teste',
                email: 'teste@example.com',
                celular: '123456789',
                mensagem: 'Teste de mensagem'
            });

        // Verifique se a resposta é um erro
        expect(response.status).toBe(500);
        expect(response.text).toBe('Erro ao enviar mensagem.');
    });
});