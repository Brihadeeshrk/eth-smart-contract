const express = require('express')
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname)))
app.use("/css",express.static(path.join(__dirname)))
app.use("/images",express.static(path.join(__dirname + '/images')))
app.use("/js",express.static(path.join(__dirname + '/scripts')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/smart-contract-landing.html'))
})
app.listen(8080)