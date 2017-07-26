"use strict"

const express = require('express')
const request = require('request')
const app = express()
const key = require('./config.json').key
const port = process.env.PORT || 4040

app.get('/', (req, res) => {
	res.send('You found it')
})

app.get('/search/:query', (req, searchRes) => {
	request('https://pixabay.com/api/?key=' + key + '&q=yellow+flowers', (err, res, body) => {
		console.log(JSON.parse(body).totalHits)
		searchRes.send(''+JSON.parse(body).totalHits)
	})
})

app.listen(port, () =>{
	console.log('Listening on', port)
})
