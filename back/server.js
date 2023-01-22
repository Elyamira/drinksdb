const express = require('express');
const cors = require('cors');
const PORT = 3001;
const bodyParser = require('body-parser');
const apiFunction = require('./api.js');
const api = apiFunction();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', api.getAllDrinks);
app.get('/random', api.getRandomDrink);

app.post('/', api.addNewDrink);
app.post('/edit', api.updateDrink);
app.post('/addToFavs', api.addDrinkToFavourites);
app.post('/removeFromFavs', api.removeDrinkFromFavourites);
app.post('/addComment', api.addCommentToRecipe);

app.listen(PORT, () => {
    console.log(`app is up and running on port ${PORT}`);
});
