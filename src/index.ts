import express from 'express'
import characterRoute from './controllers/character'

const app = express()
const PORT = 3000

app.use(express.json())

app.use(characterRoute)

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`)
})
