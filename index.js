"use strict"

const express = require('express')
const request = require('request')
const app = express()
const key = require('./config.json').key
const port = process.env.PORT || 4040

app.get('/', (req, res) => {
	res.send('You found it')
})

app.get('/search/:query', (req, res) => {
	let offset  = req.query.offset
	if (!offset || offset > 300 || offset < 3) offset = 20
	request('https://pixabay.com/api/?key=' + key + '&q=' + req.params.query + '&per_page=' + offset, (err, pixaResponse, body) => {
		const searchResults = JSON.parse(body).hits
		let resultsArray = [];
		for (let hit in searchResults) {
			const resultObject = {
				"tags": searchResults[hit].tags,
				"url": searchResults[hit].webformatURL,
				"preview": searchResults[hit].previewURL
			}
			resultsArray.push(resultObject)
		}
		res.json(resultsArray)
	})
})

app.listen(port, () =>{
	console.log('Listening on', port)
})
