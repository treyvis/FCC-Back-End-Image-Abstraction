"use strict"

const express = require('express')
const request = require('request')
const mongo = require('mongodb').MongoClient
const app = express()
const config = require('./config.json')
const port = process.env.PORT || 4040
const mongoURI = 'mongodb://' + config.user + ':' + config.password + '@ds111103.mlab.com:11103/image-abstraction-search'

app.get('/', (req, res) => {
	res.send('You found it')
})

app.get('/search/:query', (req, res) => {
	const query = req.params.query
	let offset  = req.query.offset
	if (!offset || offset > 300 || offset < 3) offset = 20
	request('https://pixabay.com/api/?key=' + config.key + '&q=' + query + '&per_page=' + offset, (err, pixaResponse, body) => {
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
		mongo.connect(mongoURI,(err, db) => {
			if (err) throw err
			const resultsObject = {
				"search": query,
				"results": resultsArray
			}
			db.collection('searches').insert(resultsObject, (err, doc) => {
				if (err) throw err
				console.log('Inserted search to database')
			})
		})
	})
})

app.listen(port, () =>{
	console.log('Listening on', port)
})
