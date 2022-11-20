const express = require('express');
const cors = require('cors');
const PORT = 3001;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
};
let uri = 'mongodb://localhost:27017/drinksDb?authSource=admin&ssl=false';
mongoose.connect(uri, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOptions));

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Add the name, please'],
    },
    taste: {
        type: String,
        required: [true, 'Add the taste, please'],
    },
    creatorId: {
        type: String,
        required: [true, ' Log in to add your own drinks'],
    },
});
const Drink = mongoose.model('Drink', drinkSchema);

const tea = new Drink({
    name: 'Tea',
    taste: 'Neutral',
    creatorId: 'auth0|62124f5c65cd1300687e0b09',
});
const coffee = new Drink({
    name: 'Coffee',
    taste: 'bitter',
    creatorId: 'auth0|62124f5c65cd1300687e0b09',
});
const defaultDrinks = [tea, coffee];

app.get('/', (req, res) => {
    Drink.find(function (err, foundDrinks) {
        if (foundDrinks.length === 0) {
            Drink.insertMany([...defaultDrinks], function (err) {
                if (err) {
                    return res.status(400).json({
                        error: 1,
                        message: err.message,
                    });
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.json(foundDrinks);
        }
    });
});

app.post('/', async (req, res) => {
    try {
        const { taste, name, creatorId } = req.body;
        const newDrink = new Drink({
            name: name,
            taste: taste,
            creatorId: creatorId,
        });

        const foundDrink = await Drink.find({
            name: newDrink.name.trim(),
        }).clone();

        if (foundDrink != null) {
            if (foundDrink.length === 0) {
                newDrink.save(function (err, result) {
                    if (err) {
                        response = {
                            error: true,
                            message: 'Error adding data',
                        };
                        res.status(200).json(response);
                    } else {
                        response = {
                            error: false,
                            message: 'Data added',
                            data: result,
                        };
                        res.status(200).json(result);
                    }
                });
            }
        }
        if (foundDrink == null) {
            throw new Error('foundDrink == null');
        } else if (foundDrink.length > 0) {
            throw new Error('foundDrink.length>0');
        }
    } catch (err) {
        return res.status(400).json({
            error: 1,
            message: err.message,
        });
    }
});

app.post('/edit', async (req, res) => {
    try {
        const { updatedDrink } = req.body;
        const update = { taste: updatedDrink.taste, name: updatedDrink.name };
        const filter = { name: updatedDrink.oldName };
        const oldDocument = await Drink.updateOne(filter, update);
        if (oldDocument) {
            Drink.find(function (err, foundDrinks) {
                if (foundDrinks.length === 0) {
                    Drink.insertMany([...defaultDrinks], function (err) {
                        if (err) {
                            return res.status(400).json({
                                error: 1,
                                message: err.message,
                            });
                        } else {
                            res.redirect('/');
                        }
                    });
                } else {
                    res.json(foundDrinks);
                }
            });
        }
    } catch (err) {
        return res.status(400).json({
            error: 1,
            message: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`app is up and running on port ${PORT}`);
});
