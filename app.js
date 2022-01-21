import express, { json } from 'express';
import chalk from 'chalk';

const app = express();
const port = 5000;

app.use(cors());
app.use(json());

const livros = [
    { id: 1, nome: 'A arte de ser imperfeito', autor: 'Brené Brown', lido: false },
    { id: 2, nome: 'Domain Driven Design', autor: 'Eric Evans', lido: false },
    { id: 3, nome: 'Robinson Crusoé', autor: 'Daniel Defoe', lido: false },
    { id: 4, nome: 'The Java EE 6 Tutorial: Advanced Topics: 2', autor: 'Eric Evans', lido: false },
];

app.get('/livros', (request, response) => {
    response.send(livros);
});

app.get('/livros/:id', (request, response) => {
    const { id } = request.params;
    const livroFiltrado = livros.find(livro => livro.id === parseInt(id));
    response.send(livroFiltrado);
});

app.get('/autor/:nome', (request, response) => {
    const { nome } = request.params;
    const livrosAutor = livros.filter(livro => livro.autor === parseInt(nome));
    response.send(livrosAutor);
})

app.post('/livros', (request, response) => {
    const livro = request.body;
    if (!livro.nome) {
        response.status(400).send('Por favor, envie o livro no body.');
    } else {
        livros.push(livro);
        response.send('OK');
    }
});

app.post('/ler/:id', (request, response) => {
    const { id } = request.params;
    const livroFiltrado = livros.find(livro => livro.id === parseInt(id));

    livroFiltrado.lido = true;
    response.send('Livro lido.');
})

app.listen(port, () => {
    console.log(`Servidor ${chalk.bgGreen(chalk.black(' ON '))} - Porta ${chalk.magenta(port)} - ${chalk.blue(`http://localhost:${port}/livros`)}`);
});