const axios = require('axios');
const constants = require('./const');

// getSearchResults is used to get search results of a query e.g : https://swapi.py4e.com/api/people/?search=r2
const getSearchResults = async (searhText, type) => {
    return await axios.get(constants.BASE_URL + type + constants.Search + searhText)
    .then(function (response) {
      return response.data.results;
    })
    .catch(function (error) {
      return {};
    })
} 

// getStarshipDetails is used to get the details of the starship and curate a dedicated response
const getStarshipDetails = async (starships) => {
    if (starships.length == 0) return {};
    let starShip = await axios.get(starships[0])
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {};
    })
    if (!!!starShip) return {};
    return {
        "name": starShip[constants.StarshipName] || "",
        "class": starShip[constants.StarshipClass] || "",
        "model": starShip[constants.StarshipModel] || ""
    }
}

// getCrewDetails is function used to get the count of crew in the given starship
const getCrewDetails = async (shipName) => {
  const ships= await getSearchResults(shipName, constants.Starships);
  if (ships.length == 0) return 0;
  let ship = ships[0];
  return ship[constants.StarshipCrew];
}

// checkAvailability is a function used to check availabilty of a person in a particular planet
const checkAvailability = async (personName, planetName) => {
    const persons = await getSearchResults(personName, constants.People);
    let personUrl = "";
    if(persons.length == 0) return false;
    let person = persons[0];
    personUrl = person[constants.URL];

    const planets = await getSearchResults(planetName, constants.Planets);
    let residents = [];
    if(planets.length == 0) return false;
    let planet = planets[0];
    residents = planet[constants.Residents];

    if (residents.length == 0) return false;
    if (residents.indexOf(personUrl) !== -1) return true;
    return false; 
}

module.exports = { getSearchResults, getStarshipDetails, getCrewDetails, checkAvailability };