const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/enviar', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const celular = req.body.celular;
    const mensagem = req.body.mensagem;

    try {
        // Configurações para o serviço de e-mail
        const transporter = nodemailer.createTransport({
            host: 'outlook.com', // Host de e-mail desejado
            port: 587, // Porta do servidor SMTP
            secure: false, // true para usar SSL/TLS, false para não usar
            auth: {
                user: 'contato.riansantos@outlook.com', // Meu e-mail
                pass: 'Cudegorila69' // Senha do meu e-mail
            }
        });

        // Detalhes do e-mail a ser enviado
        const mailOptions = {
            from: 'contato.riansantos@outlook.com', // Meu e-mail
            to: 'riansantos.dev@gmail.com', // E-mail para sera enviado a mensagem
            subject: 'Nova mensagem recebida',
            text: `Nome: ${nome}\nEmail: ${email}\nCelular: ${celular}\n\n${mensagem}`
        };

        // Envia o e-mail
        await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso.');
        res.send('Mensagem enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).send('Erro ao enviar mensagem.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});