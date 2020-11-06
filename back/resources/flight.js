const { Flight } = require.main.require("./database");

module.exports.findOne = async ({ body }) => {
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