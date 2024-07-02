var express = require('express')
var router = express.Router();

//Import du model Cart
const Cart = require('../models/carts');
const Trip = require('../models/trips');
const { checkBody, checkArray } = require('../functions/functions')
//--------------------

//GET tous les voyages dans myCart
router.get('/', (req, res) => {
    Cart.find().then(data => {
        res.json(data)
    })
})

// POST une recherche et l'ajoute à MyCart
router.post('/', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;

    Cart.find({ departure, arrival, date }).then(data => {
        if (checkArray(data)) {
            Trip.findOne({ departure, arrival, date }).then(data => {

                // res.json({ data: data })
                const newCart = new Cart({
                    departure: data.departure,
                    arrival: data.arrival,
                    date: data.date,
                    price: data.price,
                    trip: data.id,
                    booked: false,
                })

                newCart.save().then(data => {
                    res.json({ data: data, Result: 'Nouvel objet dans le Cart' })
                })
            })
        } else {
            res.json({ Error: "Le voyage existe déjà" });
        }

    })
})

module.exports = router;