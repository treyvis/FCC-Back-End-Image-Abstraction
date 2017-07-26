"use strict"

const express = require('express')
const request = require('request')
const app = express()
const port = process.env.PORT || 4040

request('https://pixabay.com/api/?key=5984160-851323f1904b8ff9fb551e650&q=yellow+flowers&image_type=photo',
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
