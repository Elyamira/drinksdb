const mongoose = require('mongoose');

let uri = 'mongodb://localhost:27017/drinksDb?authSource=admin&ssl=false';
mongoose.connect(uri, { useNewUrlParser: true });

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        requred: [true, 'the comment is missing'],
    },
    author: {
        type: String,
        required: [true, 'the author of the comment is missing'],
    },
    date: {
        type: Date,
    },
});

const recipeSchema = new mongoose.Schema({
    ingredients: {
        type: [{ type: String }],
    },
    steps: {
        type: [{ type: String }],
    },
    servings: {
        type: Number,
    },
});
const Comment = mongoose.model('Comment', commentSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Add the name, please'],
    },
    taste: {
        type: String,
        required: [true, 'Add the taste, please'],
    },
    category: {
        type: [{ type: String }],
    },
    image: {
        type: [{ type: String }],
    },
    creatorId: {
        type: String,
        required: [true, ' Log in to add your own drinks'],
    },
    isInFavourites: {
        type: [{ type: String }],
    },
    comments: {
        type: [{ type: Comment.schema }],
    },
    recipe: {
        type: Recipe.schema,
    },
});
const Drink = mongoose.model('Drink', drinkSchema);

const tea = new Drink({
    name: 'Tea',
    taste: 'Neutral',
    category: ['Hot', 'Tea'],
    creatorId: 'auth0|62124f5c65cd1300687e0b09',
    isInFavourites: [
        'auth0|62124f5c65cd1300687e0b09',
        'auth0|62fa09037a9349bf5c7bcbf2',
    ],
    comments: [],
    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673174664/tqwa1z58umkjycaz1ibi.jpg',
    recipe: {
        ingredients: ['ingr 1', 'ingr2', 'ingr3'],
        steps: ['step 1', 'step 2', 'step3'],
        servings: 4,
    },
});
const coffee = new Drink({
    name: 'Coffee',
    taste: 'bitter',
    category: ['Hot'],
    creatorId: 'auth0|62124f5c65cd1300687e0b09',
    comments: [],
    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673184834/vpslyl0wccbynknxbx18.jpg',
    recipe: {
        ingredients: ['ingr ', 'ingr', 'ingr'],
        steps: ['step', 'step', 'step'],
        servings: 2,
    },
});

const defaultDrinks = [tea, coffee];

const api = () => {
    const getAllDrinks = (req, res) => {
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
    };

    const getRandomDrink = async (req, res) => {
        const randomDrink = await Drink.aggregate().sample(1);
        res.json(randomDrink);
    };

    const addNewDrink = async (req, res) => {
        try {
            const {
                taste,
                name,
                creatorId,
                categories,
                ingredients,
                steps,
                servings,
                image,
            } = req.body;
            const newRecipe = new Recipe({
                ingredients: ingredients,
                steps: steps,
                servings: servings,
            });
            const newDrink = new Drink({
                name: name,
                taste: taste,
                creatorId: creatorId,
                category: categories,
                recipe: newRecipe,
                image: image,
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
    };
    const updateDrink = async (req, res) => {
        try {
            const { updatedDrink } = req.body;
            console.log(updatedDrink, 'updatedDrink');
            const update = {
                taste: updatedDrink.taste,
                name: updatedDrink.name,
                category: updatedDrink.categories,
                recipe: updatedDrink.recipe,
                image: updatedDrink.image,
            };
            const filter = { name: updatedDrink.oldName };
            const oldDocument = await Drink.updateOne(filter, update);
            if (oldDocument) {
                Drink.find(function (err, foundDrinks) {
                    if (!err) {
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
    };
    const addDrinkToFavourites = async (req, response) => {
        const { name, personId } = req.body;
        try {
            Drink.updateOne(
                { name: name },
                { $addToSet: { isInFavourites: personId } },
                (error, res) => {
                    if (res.acknowledged) {
                        Drink.find(function (err, foundDrinks) {
                            if (!err) {
                                response.status(200).json(foundDrinks);
                            }
                        });
                    }
                    if (error) {
                        return response.status(400).json({
                            message: "Couldn't add to favs",
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
    const removeDrinkFromFavourites = async (req, response) => {
        const { name, personId } = req.body;
        try {
            Drink.updateOne(
                { name: name },
                { $pull: { isInFavourites: personId } },
                (error, res) => {
                    if (res.acknowledged) {
                        Drink.find(function (err, foundDrinks) {
                            if (!err) {
                                response.status(200).json(foundDrinks);
                            }
                        });
                    }
                    if (error) {
                        return response.status(400).json({
                            message: "Couldn't remove from favs  ",
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
    const addCommentToRecipe = async (req, response) => {
        const { drinkName, userComment } = req.body;
        const today = new Date();
        const newComment = new Comment({
            text: userComment.text,
            author: userComment.author,
            date: today,
        });
        try {
            Drink.updateOne(
                { name: drinkName },
                { $addToSet: { comments: newComment } },
                (error, res) => {
                    if (res.acknowledged) {
                        Drink.find(function (err, foundDrinks) {
                            if (!err) {
                                response.status(200).json(foundDrinks);
                            }
                        });
                    }
                    if (error) {
                        return response.status(400).json({
                            message: "Couldn't add the comment",
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return {
        getAllDrinks,
        getRandomDrink,
        addNewDrink,
        updateDrink,
        addDrinkToFavourites,
        removeDrinkFromFavourites,
        addCommentToRecipe,
    };
};
module.exports = api;
