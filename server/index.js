import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json("jawa")
})

io.on('connection', (socket) => {
  console.log('a user connected')
  console.log(socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on("sending", (x) => {
    console.log(x)
  })
})

app.post('/data', (req, res) => {
    const {temperature, humidity} = req.body
    res.json({status: "sent"})
    io.emit('rece', temperature, humidity)
    console.log(temperature)
})

httpServer.listen(3000, () => {
  console.log("server running")
})

