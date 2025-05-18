import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import orderRoutes from './routes/orderRoutes.js'
import { db } from './models/db.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(orderRoutes)

app.get('/', (req, res) => {
    console.log('API Pão no Gato funcionando')
})

app.get('/ping', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1+ 1 AS result')
        res.json({ success: true, result: rows[0].result })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Erro na conexão com banco de dados' })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})