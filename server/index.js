const http = require('http')
const fs = require('fs')

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const contentTypes = {
  'png': 'image/png',
  'css': 'text/css',
  'js': 'text/javascript',
  'ico': 'image/vnd.microsoft.icon'
};

const tasks =[
    { description: "Criar servidor node para retornar minha página em http://localhost:3000/.", targetDate: '03/10/2022' },
    { description: "Criar servidor REST para retornar as tarefas.", targetDate: '03/10/2022' },
    { description: "Implementar layout da minha página de tarefas.", targetDate: '04/10/2022' },
    { description: "Fazer uma requisição para /api/tasks do meu javacript.", targetDate: '04/10/2022' },
    { description: "Apartir das tarefas retornadas renderiza-las na tela.", targetDate: '04/10/2022' },
    { description: "Criar campo de busca e filtrar pelas tarefas.", targetDate: '04/10/2022' },
    { description: "Adicionar mensagem de nenhuma tarefa encontrada.", targetDate: '04/10/2022' },
    { description: "Garantir que o layout esteja responsivo.", targetDate: '05/10/2022' },
    { description: "Fazer teste manual da minha páginas e verificar se todos os critérios de aceite estão cobertos.", targetDate: '05/10/2022' },
    { description: "Fazer o commit e finalizar minha task no Jira.", targetDate: '05/10/2022' }
];

const server = http.createServer((req, res) => {
    const url = req.url;
    const fileType = url.split('.')?.length > 1 && url.split('.')[1];

    if (fileType) {
        res.writeHead(200, { 'content-type': contentTypes[fileType] || 'text/plain' });
        fs.createReadStream(`client${url}`).pipe(res);
        return;
    }

    if (url === '/api/tasks') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(tasks));
        return;
    }

    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('client/index.html').pipe(res);
});

server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
