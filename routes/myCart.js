var moment = require('moment');
var express = require('express');
var router = express.Router();

//Import du model Cart
const Cart = require('../models/carts');
const Trip = require('../models/trips');
const { filterObjectArray, checkArray } = require('../functions/functions')
//--------------------

//GET récupère les informations de Cart pour les afficher
//dans le formulaire Cart
router.get('/', (req, res) => {
    Cart.find().then(data => {
        res.json(data)
    })
})

//GET/trips les voyages dont le body renseigné est celui du formulaire
//search et renvoie les informations
//DOIT vérifier que le voyage n'est pas déjà dans le Cart et dans ce cas
//ne doit pas l'afficher.
router.get('/search', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date; //La date doit être sous le format YYYY-MM-DD

    const day2 = Number(moment(date).format('DD')) + 1
    let demain = `${moment(date).format('YYYY')}-${moment(date).format('MM')}-${day2}`;
    demain = moment(demain).format('YYYY-MM-DD');

    // const airedAt = { $gte: date }

    const findDate = new Date(date)
    const findTomorow = new Date(demain)

    Trip.find({ departure, arrival, date: { $gte: findDate, $lte: findTomorow } }).then(data => {

        const searchResult = data;

        //Maintenant il faut vérifier dans le cart que ces données n'existent pas déjà
        //Si dans le cart => NE PAS AFFICHER

        // res.json({ data: searchResult })

        Cart.find({}).then((data) => {
            let finalArray = filterObjectArray(searchResult, data);
            res.json(finalArray);
            //Le finalArray ne comprend QUE les résultats qui ne sont pas situé dans le cart
            //Et ce si ils sont Cart OU Booke
        })

    });
});

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

    });
});

//POST route update l'état booked d'un cart
// router.post('/bookCart', (res, req) => {
//     Cart.find({}).then((data) => {
//         res.json(data)
//     })
// })

//DELETE route de deletion d'un élément du cart à partir de l'id du Trip
router.delete('/', (req, res) => {
    const tripId = req.body.tripId

    Cart.deleteOne({ trip: tripId }).then((data) => {
        res.json(data)
    })
});

module.exports = router;