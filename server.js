// import dependencies and initialize app
const express = require('express')
const app = express()
const port = 3000
const logger = require('morgan')
const bodyParser = require('body-parser')

const records = require('./db/records')
// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// index route
app.get('/', (req, res) => {
  res.send('Please start record')
})

// all records
app.get('/records', (req, res) => {
  res.json({
    message: 'ok',
    records
  })
})

// getById
app.get('/records/:id', (req, res) => {
  const recordById = records.filter((record) => {
    return record.id == req.params.id
  })
  res.json({
    message: 'ok',
    recordById
  })
})

// delete by id
// app.delete('/records/:id', (req, res) => {
//   const deleteRecord = records.filter(record => {
//     return record.id == req.params.id
//   })
//   res.json({
//     message: 'deleted',
//     deleteRecord
//   })
// })

app.delete('/records/:id', (req, res) => {
  records.splice(parseInt(req.params.id) -1, 1)
  console.log(records)
  res.send({status: 'deleted'})
})

// post route
app.post('/records', (req, res) => {
  const record = req.body
  records.push(req.body)
  res.send(records[records.length-1])
})

// put route
app.put('/records/:id', (req, res) => {
  const updateRecord = {
    id: req.params.id,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year
  }
  records[req.params.id - 1] = updateRecord
  res.send(records)
  console.log(records)
})

// add error handler
app.use('*', (req, res) => {
  res.status(404).send('404, album is over')
})

app.listen(port, () => console.log(`Rock'n on port ${port}`))
