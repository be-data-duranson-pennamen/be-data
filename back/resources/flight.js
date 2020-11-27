const { Flight } = require.main.require("./database");
const fs = require('fs')

const findOne = async ( body ) => {
  const flight = await Flight.findOne({
    where: { num: body.num },
  });
  return flight;
};
module.exports.readAll = async () => {
  const flight = await Flight.findAll();
  return flight;
};
module.exports.createOne = async ({ body }) => {
  await Flight.create({
    num: body.num,
    departureAirport: body.departureAirport,
    arrivalAirport: body.arrivalAirport,
    departureDate: body.departureDate,
    arrivalDate: body.arrivalDate,
    pilot1: body.pilot1,
    pilot2: body.pilot2,
    stewart1: body.stewart1,
    stewart2: body.stewart2,
    emptyPlaces: body.emptyPlaces,
    numPlane : body.numPlane
  });
};
module.exports.deleteOne = async ({ body }) => {
  await Flight.destroy({ where: { num: body.num } });
};

const reduceEmptyPlaces = async (body) => {
  await findOne({num : body.numFlight}).then((flgt) => {
    // Check if record exists in db
    if (flgt) {
      flgt.update({
        emptyPlaces: flgt.emptyPlaces - body.placesBought
      })
    }
  })
};

const getAllAvailableAirports = () => {
  const samples = JSON.parse(fs.readFileSync("./generation/samples.json"))
  return samples.airports
}

// ATTENTION : cette syntaxe remplace les module.exports du dessus, s'il faut exporter une fonction, la définir comme en dessous
module.exports = {findOne,getAllAvailableAirports,reduceEmptyPlaces}