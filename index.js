"use strict"

const express = require('express')
const request = require('request')
const app = express()
const key = require('./config.json').key
const port = process.env.PORT || 4040

console.log(key)

request('https://pixabay.com/api/?key=' + key + '&q=yellow+flowers',
	(err, res, body) => {
		console.log(JSON.parse(body).totalHits)
})


app.get('/', (req, res) => {
	res.send('You found it')
})

app.get('/search/:query', (req, res) => {
	res.send(req.params.query)
})

app.listen(port, () =>{
	console.log('Listening on', port)
})
