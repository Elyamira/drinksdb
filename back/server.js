const express = require("express");
const cors = require("cors");
const PORT = 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
};
let uri = "mongodb://localhost:27017/drinksDb?authSource=admin&ssl=false";
mongoose.connect(uri, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Add the name, please"]
    },
    taste: {
        type: String,
        required: [true, "Add the taste, please"]
    },
})
const Drink = mongoose.model("Drink", drinkSchema)

const tea = new Drink({
    name: "Tea",
    taste: "Neutral"
})
const coffee = new Drink({
    name: "Coffee",
    taste: "bitter"
})
const defaultDrinks = [tea, coffee];

app.get("/", (req, res) => {
    Drink.find(function (err, foundDrinks) {
        if (foundDrinks.length === 0) {
            Drink.insertMany([...defaultDrinks], function (err) {
                if (err) {
                    return res.status(400).json({
                        error: 1,
                        message: err.message
                    })
                }
                else {
                    console.log("inserted default drinks");
                    res.redirect("/")

                }
            })
        } else {
            res.json(foundDrinks)
        }
    })
})

app.listen(PORT, () => {
    console.log(`app is up and running on port ${PORT}`);
})