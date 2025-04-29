import express from 'express'; // importando o express
import { PrismaClient } from '@prisma/client'; // importando o prisma client



const prisma = new PrismaClient()

const app = express() // instanciando o express
app.use(express.json()) // middleware para o express entender o json


app.post('/usuarios', async (req, res) => { 

    await prisma.user.create({
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade,
        }
    })

    res.status(201).json(req.body) // retornando o usuario criado com o status 201 (created)

})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id // pegando o id do usuario da url
        },
        data: {
            email: req.body.email, 
            nome: req.body.nome,
            idade: req.body.idade
        }
    })

    res.status(201).json(req.body)

})


app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany() // buscando todos os usuarios no banco de dados

    res.status(200).json(users) // retornando todos os usuarios com o status 200 (ok)

})

app.listen(3000) // rodando o servidor na porta 3000




/*

    npm init -y  <-  inicializa o projeto com o package.json
    npm i express  <- instala o express
    no aquivo ‘package.json’ adicionar “"type": "module"  <-  para usar o import
    npm install prisma –save-dev  <- instala o prisma como dev dependency
    npx prisma init  <-  inicializa o prisma e cria o arquivo .env e o arquivo schema.prisma
    npx prisma db push <- cria o banco de dados e as tabelas no banco de dados
    npx prisma studio  <-  abrir prisma studio
    node - -watch server.js  <-  iniciar servidor


*/

 