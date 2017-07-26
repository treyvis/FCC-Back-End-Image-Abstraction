"use strict"

const express = require('express')
const request = require('request')
const mongo = require('mongodb').MongoClient
const app = express()
const config = require('./config.json')
const port = process.env.PORT || 4040
const mongoURI = 'mongodb://' + config.user + ':' + config.password + '@ds111103.mlab.com:11103/image-abstraction-search'

mongo.connect(mongoURI, (err, db) =>{
	console.log('Connected to database')
	//db.collection('searches').insert({"test":"This is my set doc for serach"})
})

app.get('/', (req, res) => {
	res.send('You found it')
})

app.get('/search/:query', (req, res) => {
	let offset  = req.query.offset
	if (!offset || offset > 300 || offset < 3) offset = 20
	request('https://pixabay.com/api/?key=' + config.key + '&q=' + req.params.query + '&per_page=' + offset, (err, pixaResponse, body) => {
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
