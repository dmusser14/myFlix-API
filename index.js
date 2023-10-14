// requiring Express and morgan into index.js and setting express to the variable of app
const express = require('express'),
  morgan = require('morgan');

const app = express();

// JSON object containing data of top 10 movies 
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

// Invoking the middleware function. Logging to the terminal. "common" refers to morgan's "common" format

app.use(morgan('common'));

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