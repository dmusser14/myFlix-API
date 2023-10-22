// requiring express, morgan, bodyParser, and uuid into index.js and setting express to the variable of app
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

// JSON object containing example user data
let users = [
    {
        id: 1,
        name: 'Kim',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Joe',
        favoriteMovies: ['The fountain']
    },
]

// JSON object containing movie data 
let movies = [
    {
        'Title':'The Lord of the Rings: The Fellowship of the Ring',
        'Description':'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        'Genre': {
            'Name':'Action',
            'Description':'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a indestructible villain, or a pursuit which usually concludes in victory for the hero.'
        },
        'Director': {
            'Name':'Peter Jackson',
            'Bio':'Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the fourth-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide.[1]',
            'Birth':'1961'
        },
        'ImageURL':'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/?ref_=tt_ov_i',
        'Featured':false
    },
    {
        'Title':'Inception',
        'Description':'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
        'Genre': {
            'Name':'Action',
            'Description':'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a indestructible villain, or a pursuit which usually concludes in victory for the hero.'
        },
        'Director': {
            'Name':'Christopher Nolan',
            'Bio':'Christopher Edward Nolan CBE (born 30 July 1970) is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide. The recipient of many accolades, he has been nominated for five Academy Awards, five BAFTA Awards and six Golden Globe Awards. In 2015, he was listed as one of the 100 most influential people in the world by Time, and in 2019, he was appointed Commander of the Order of the British Empire for his contributions to film.',
            'Birth':'1970'
        },
        'ImageURL':'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i',
        'Featured':false
    },
    {
        'Title':'Toy Story',
        'Description':"A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
        'Genre': {
            'Name':'Comedy',
            'Description':'A comedy film is a category of film which emphasizes on humor. These films are designed to make the audience laugh in amusement.[1] Films in this style traditionally have a happy ending (dark comedy being an exception to this rule). Comedy is one of the oldest genres in film and it is derived from classical comedy in theatre.'
        },
        'Director': {
            'Name':'John Lasseter',
            'Bio':'John Alan Lasseter (/ˈlæsətər/ LASS-ə-tər; born January 12, 1957)[5] is an American filmmaker, animator, and voice actor. He is the head of animation at Skydance Animation.[1] He was also previously the chief creative officer of Pixar Animation Studios, Walt Disney Animation Studios, and Disneytoon Studios, as well as the Principal Creative Advisor for Walt Disney Imagineering.[6]',
            'Birth':'1957'
        },
        'ImageURL':'https://www.imdb.com/title/tt0114709/mediaviewer/rm3813007616/?ref_=tt_ov_i',
        'Featured':false
    },
    {
        'Title': 'Good Will Hunting',
        'Description':'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
        'Genre': {
            'Name':'Drama',
            'Description':"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] The drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject matter, or they combine a drama's otherwise serious tone with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline."
        },
        'Director': {
            'Name':'Gus Van Sant',
            'Bio':'Gus Green Van Sant Jr.[2] (born July 24, 1952) is an American film director, producer, photographer, and musician who has earned acclaim as an independent filmmaker. His films typically deal with themes of marginalized subcultures, in particular homosexuality. Van Sant is considered one of the most prominent auteurs of the New Queer Cinema movement.',
            'Birth':'1952'
        },
        'ImageURL':'https://www.imdb.com/title/tt0119217/mediaviewer/rm1765736448/?ref_=tt_ov_i',
        'Featured':false
    },
    {
        'Title':'Star Wars: Episode V - The Empire Strikes Back',
        'Description':'After the Rebels are overpowered by the Empire, Luke Skywalker begins his Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
        'Genre': {
            'Name':'Adventure',
            'Description':'An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, comedy, drama, fantasy, science fiction, family, horror, war, or the medium of animation.[1]'
        },
        'Director': {
            'Name': 'Irvin Kershner',
            'Bio':'rvin Kershner (born Isadore Kershner; April 29, 1923 – November 27, 2010) was an American film director, actor, and producer of film and television.',
            'Birth':'1923',
            'Death':'2010'
        },
        'ImageURL':'https://www.imdb.com/title/tt0080684/mediaviewer/rm3114097664/?ref_=tt_ov_i',
        'Featured':false
    },
];
// Using middleware to apply bodyParser
app.use(bodyParser.json());

// Invoking the middleware function. Logging to the terminal. "common" refers to morgan's "common" format
app.use(morgan('common'));

// Serving a static file
app.use(express.static('public'));

// app.METHOD(PATH, HANDLER)

// READ requests

// Return list of all movies to user
app.get('/movies', (req, res) => {
    res.status(200).json(movies); // logic to send a response
});

// return data about a single movie by title to user
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
})

// return data about a genre by name/title
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
})

// return data about a director by name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
})

// Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to my Movie App!');
});

// CREATE requests

// Allow new users to register
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})

// Allow users to add a movie to their list of favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user){
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

// DELETE requests

// Allow users to remove a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user){
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

// Allow users to deregister
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user){
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})

// UPDATE requests

// Allow users to update username
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id );

    if (user){
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

// Error-handling
app.use((err, req, res, next) => {
    console,error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});