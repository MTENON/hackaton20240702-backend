var moment = require('moment');
var express = require('express')
var router = express.Router();

//Import du model Trip
const Trip = require('../models/trips');
//--------------------

//Route affiche tous les voyages
router.get('/', (req, res) => {
    Trip.find().then(data => {
        res.json({ data: data })
    })
})

//Route qui permet d'afficher les routes avec comme critères:
//Departure + Arrival + Date
//Et restitue à la sortie un tableau avec les informations
router.post('/', (req, res) => {

})

//Route affiche le voyage par id. Affiche actuellement la date de voyage
router.get('/date/:id', (req, res) => {
    Trip.findById(`${req.params.id}`).then(data => {
        let formatted_date = moment(data.date).format('YYYY-MM-DD, h:mm:ss');
        res.json({ data: formatted_date })
    })
})

module.exports = router;