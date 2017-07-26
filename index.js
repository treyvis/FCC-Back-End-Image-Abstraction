"use strict"

const express = require('express')
const app = express()
const port = process.env.PORT || 4040

app.get('/', (req, res) => {
	res.send('You found it')
})

app.get('/search/:query', (req, res) => {
	res.send(req.params.query)
})

app.listen(port, () =>{
	console.log('Listening on ', port)
})
