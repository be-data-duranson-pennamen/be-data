const { Flight } = require.main.require("./model");
const fs = require("fs");

module.exports.findOne = async ({ body }) => {
  const flight = await Flight.findOne({
    where: { id: body.id },
  });
  return flight;
};
module.exports.readAll = async () => {
  const flight = await Flight.findAll();
  return flight;
};
module.exports.createOne = async ({ body }) => {
  await Flight.create({
    departureAirport: body.departureAirport,
    arrivalAirport: body.arrivalAirport,
    departureDate: body.departureDate,
    arrivalDate: body.arrivalDate,
    pilot1: body.pilot1,
    pilot2: body.pilot2,
    stewart1: body.stewart1,
    stewart2: body.stewart2,
    emptyPlaces: body.emptyPlaces,
    planeId: body.planeId,
  });
};
module.exports.deleteOne = async ({ body }) => {
  await Flight.destroy({ where: { id: body.id } });
};
module.exports.createMany = async ({body}) => {
  if(body.flightList.length>0) {
    await Flight.bulkCreate(body.flightList);
  }
};

module.exports.getAllAvailableAirports = () => {
  const { samples } = require.main.require("./samples");
  return samples.airports;
};
