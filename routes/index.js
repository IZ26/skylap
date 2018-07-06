var express = require('express');
var router = express.Router();
var Papa = require('papaparse');

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next){
    var file = fs.createReadStream('./public/assets/data_companies.csv')

    Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,

        complete: (results) => {
            console.log('ok');
            var data = [];
            for (let comp of results.data) {
                data.push(comp['nom de la compagnie'].split(' ').join('-').toLowerCase());
            }
            res.end(JSON.stringify(data));
        }
    })
})


/* GET home page. */
router.get('/:companyName', function(req, res, next) {
    var file = fs.createReadStream('./public/assets/data_companies.csv')

    let companyName = req.params.companyName;
    console.log(companyName);

    Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,

        // complete: (results) => {
        //     res.send(results.data);
        // }
// .

        complete: (results) => {

            for (let comp of results.data) {

                let allNames = comp['nom de la compagnie'];


                if (comp['nom de la compagnie'].split(' ').join('-').toLowerCase() == companyName){
                    console.log(comp['Taille du bagage à main']);
                    res.render('landing', {
                        allNames : allNames,
                        companyName : comp['nom de la compagnie'],
                        iata : comp['IATA'],
                        completeName : comp['Nom complet'],
                        cabinWeight : comp['poid cabine'],
                        holdHeight : comp['taille soute'],
                        maxWeight : comp['Poids max. autoris� des bagages en soute'],
                        maxCab : comp['poid cabine'],
                        wifi : comp['WIFI'],
                        alliance : comp['Alliance'],
                        phone : comp['num�ro de t�l�phone'],
                        nationality : comp['Nationalit�'],
                        rootAirport : comp['A�roport de base'],
                        headquarter : comp['Si�ge Social '],
                        creationDate : comp['Date de cr�ation'],
                        ponctuality : comp['PONCTUALIT� momondo'],
                        lateFlights : comp['VOLS RETARD�S momondo'],
                        handyBagHeight : comp['Taille du bagage � main'],
                        service : comp['Services � bord'],
                        date : comp['Date de cr�ation'],
                        site : comp['Site Web'],
                        fleetSize : comp['taille de la flotte'],
                        fleetAge : comp['Age moyen de la flotte']
                    });
                }
            }
        }

    })

});



module.exports = router;
