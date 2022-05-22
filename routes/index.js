var express = require('express');
var router = express.Router();
const utility = require('./util');
const constants = require('./const');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET information */
router.get('/information', async function(req, res, next) {
  const persons = await utility.getSearchResults("Darth Vader", constants.People);
  let starShipUrls = [];
  if (persons.length == 0) {
    starShipUrls = [];
  } else {
    let personDetails = persons[0];
    starShipUrls = personDetails[constants.Starships];
  }
  
  const starshipDetails = await utility.getStarshipDetails(starShipUrls);
  
  const crew = await utility.getCrewDetails("Death Star");

  const isLeiaOnPlanet = await utility.checkAvailability("Leia Organa", "Alderaan");
  
  let response = {
    "starship" : starshipDetails,
    "crew": crew,
    "isLeiaOnPlanet": isLeiaOnPlanet,
  }
  res.send(response);
});

module.exports = router;
