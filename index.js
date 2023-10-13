// requiring Express into index.js and setting express to the variable of app
const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path
  path = require('path');

const app = express();

// create a write stream (in append mode)
// a 'log.txt' file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// JSON object containing date of top 10 movies 
let topTenMovies = [
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        director: 'Peter Jackson'
    },
    {
        title: 'Inception',
        director: 'Christopher Nolan'
    },
    {
        title: 'Toy Story',
        director: 'John Lasseter'
    },
    {
        title: 'Good Will Hunting',
        director: 'Gus Van Sant'
    },
    {
        title: 'The Way Way Back',
        director: 'Nat Faxon'
    },
    {
        title: 'Wall-E',
        director: 'Andrew Stanton'
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        director: 'Irvin Kershner'
    },
    {
        title: 'Captain America: The Winter Soldier',
        director: 'Anthony Russo'
    },
    {
        title: 'The Avengers',
        director: 'Joss Whedon'
    },
    {
        title: 'Whiplash',
        director: 'Damien Chazelle'
    } 
];

// Setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// Serving a static file
app.use(express.static('public'));

// GET requests
// app.METHOD(PATH, HANDLER)
app.get('/movies', (req, res) => {
    res.json(topTenMovies); // logic to send a response
});

app.get('/', (req, res) => {
    res.send('Welcome to my Movie App!');
});

// Error-handling
app.use((err, req, res, next) => {
    console,error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});