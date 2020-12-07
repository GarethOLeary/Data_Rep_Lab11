const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

// using cors package
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// tells us where the build folder is
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));


// parse application that allows the body of a http request to be parsed
app.use(bodyParser.urlencoded({ extended: false }))

// parse application for json
app.use(bodyParser.json())

// string to connect you to database 
const myConnectionString = 'mongodb+srv://admin:drq12349@cluster0.hd8xq.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;
// schema made for database
// telling database what type of data is being stored
var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});
// allows me to write data to database
var MovieModel = mongoose.model("movie", movieSchema);

// Get request 
app.get('/api/movies', (req, res) => {

    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }

    // ];

    // find records of database and send them back
    MovieModel.find((err, data) => {
        res.json(data);
    })

    // object and message being passed down
    //  res.status(200).json({
    //  message: "Everything is ok",
    //  movies: mymovies
    // });
})

// listens to a get request at local host...
app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id);

    // call back function
    //sends back data
    MovieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

// listens for put request that passes in id
app.put('/api/movies/:id', (req, res) => {
    console.log("Update movie: " + req.params.id);
    console.log(req.body);
    // method that makes an asynchronous call to database
    // when request is finished it sends back some data
    MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })
})

// listens for http delete method
app.delete('/api/movies/:id', (req, res) => {
    // logs to console and pulls out id from url
    console.log("Delete Movie: " + req.params.id);

    //deletes record and sends back data
    MovieModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})

// listens to post request at url
// Pulls title,year and poster out of body
app.post('/api/movies', (req, res) => {
    console.log("Movie Received!");
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    // create method - write data to database
    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    })

    // send a response down to client
    res.send('Item Added');
})

// Handles any requests that don't match the ones above
// sending a file and joining two paths
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
    });
    

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})