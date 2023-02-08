// 3rd party libraries
const express = require('express')
const mongoose = require("mongoose")
const uuid = require('uuid')
var cors = require('cors')
// Application libraries
const Player = require('./app/models/player.js')

const db_config = require('./app/config/db.config.js')


const app = express()
const port = process.env.PORT || 8080

const path = __dirname + '/dist/'
app.use(express.static(path))
app.use(cors())
app.use(express.json())

mongoose.connect(
  db_config.url, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
)
mongoose.set('strictQuery', false)

app.get('/player', (req, res) => {
  Player.find({}, (err, found) => {
      if (!err) {
        res.send(found)
      }
      console.log(err)
  }).catch(err => {
    console.log("Error occured, " + err)
  })
})

app.get("/player/:id", async (req, res) => {
  const { id } = req.params
  Player.findOne({'id': id}, (err, found) => {
    if (!err) {
      res.send(found)
    }
    console.log(err)
  }).catch(err => {
    console.log("Error occured, " + err)
  })
})

app.post('/player', (req, res) => {
  const player = { 
    ...req.body, 
    id: uuid.v4(),
  }
  const newPlayer = new Player(player)
  newPlayer.save()
  .then((createdPlayer) => {
    console.log("Player created")
    res.status(201).json(createdPlayer)
  }).catch((err) => {
    console.log(err)
    res.status(500)
  })
})

app.listen(port)
console.log('Server started at http://localhost:' + port)
console.log('config:', db_config)
