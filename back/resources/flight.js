const { Flight, Ticket, Passenger } = require.main.require("./model");

module.exports.findOne = async ({ body }) => {
  if (body.withPassengers === true) {
    const flight = await Flight.findOne({
      where: { id: body.id },
      include: [{ model: Ticket }],
    });
    const passengersIdList = flight.tickets.map( ticket => ticket.passengerId)
    const passengers = await Passenger.findAll({where :{id : passengersIdList}})
    flight.dataValues.passengers = passengers;
    return flight;
  } else {
    const flight = await Flight.findOne({
      where: { id: body.id },
    });
    return flight;
  }
};
module.exports.readAll = async () => {
  const flight = await Flight.findAll();
  return flight;
};
module.exports.update = async ({ body }) => {
  const flight = await Flight.findOne({
    where: { id: body.id },
  });
  await flight.update({
    pilot1: body.pilot1,
    pilot2: body.pilot2,
    stewart1: body.stewart1,
    stewart2: body.stewart2,
    price: body.price,
  });
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
    price: body.price,
  });
};
module.exports.deleteOne = async ({ body }) => {
  await Flight.destroy({ where: { id: body.id } });
  await Ticket.destroy({ where: { flightId: body.id } });
};
module.exports.deleteAll = async () => {
  await Flight.destroy({ truncate: true });
};
module.exports.createMany = async ({ body }) => {
  if (body.flightList.length > 0) {
    await Flight.bulkCreate(body.flightList);
  }
};

module.exports.getAllAvailableAirports = () => {
  const { samples } = require.main.require("./samples");
  return samples.airports;
};
