import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.status(200).send({ 
   result:'Ok', data:['Listagem de Usuários']
  })
})

app.listen(3030)

