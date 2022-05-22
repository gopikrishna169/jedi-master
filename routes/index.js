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
  // persons is an array, as a result of the search API of name Darth Vader
  const persons = await utility.getSearchResults("Darth Vader", constants.People);
  let starShipUrls = [];

  // Below logic is to get the starship url of the particalur person searched above
  if (persons.length == 0) {
    starShipUrls = [];
  } else {
    let personDetails = persons[0];
    if (!!!personDetails[constants.Starships]) {
      starShipUrls = [];
    } else {
      starShipUrls = personDetails[constants.Starships];
    }
  }
  
  // starshipDetails consist of the required curated stap ship details associated by the person searched above
  const starshipDetails = await utility.getStarshipDetails(starShipUrls);
  
  // crew is the count of crew members available for the given star ship
  const crew = await utility.getCrewDetails("Death Star");

  // isLeiaOnPlanet is a boolean for the person's presence in the given planet
  const isLeiaOnPlanet = await utility.checkAvailability("Leia Organa", "Alderaan");
  
  let response = {
    "starship" : starshipDetails,
    "crew": crew,
    "isLeiaOnPlanet": isLeiaOnPlanet,
  }
  res.send(response);
});

module.exports = router;
