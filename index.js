const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const professoresRouter = require('./routes/professores')

app.use('/professores', professoresRouter)


const alunosRouter = require('./routes/alunos')

app.use('/alunos', alunosRouter)

app.listen(3000, () => {
  console.log('Api rodando em http://localhost:3000')
})
