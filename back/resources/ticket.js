const { Ticket } = require.main.require("./model");
const { flight, passenger } = require.main.require("./resources");

module.exports.findOne = async ({ body }) => {
  const ticket = await Ticket.findOne({
    where: { id: body.id },
  });
  return ticket;
};
module.exports.readAll = async () => {
  const ticket = await Ticket.findAll();
  return ticket;
};
module.exports.deleteAll = async () => {
  await Ticket.destroy({ truncate: true });
};

module.exports.createOne = async ({ body }) => {
  await Ticket.create(body);
};
module.exports.generateRandom = async () => {
  const flights = await flight.readAll();
  const passengers = await passenger.readAll();

  let usedId = [];

  let tickets = [];
  let passengerNumberPerFlight = [];
  await flights.forEach(async (flight) => {
    let flightTickets = [];
    let randomPassengerNumber = Math.floor(
      Math.random() * (flight.emptyPlaces + 5)
    ); // pour augmenter les chances d'avoir de vols plein
    if (randomPassengerNumber > flight.emptyPlaces)
      randomPassengerNumber = flight.emptyPlaces; // s'assurer qu'on ne dépasse pas
    let usedIndexes = [];
    for (let i = 0; i < randomPassengerNumber; i++) {
      if (usedIndexes.length == passengers.length) break; // pour eviter les boucles infinies
      if (usedId.length == passengers.length) break; // pour eviter les boucles infinies
      let passengerIndex = Math.floor(Math.random() * passengers.length);
      while (
        usedIndexes.includes(passengerIndex) ||
        usedId.includes(passengers[passengerIndex].dataValues.id)
      ) {
        passengerIndex = Math.floor(Math.random() * passengers.length);
      }
      usedIndexes.push(passengerIndex);
      usedId.push(passengers[passengerIndex].dataValues.id);
      flightTickets.push({
        flightId: flight.id,
        passengerId: passengers[passengerIndex].dataValues.id,
      });
    }
    passengerNumberPerFlight.push(usedIndexes.length);
    tickets = tickets.concat(flightTickets);
  });

  await Ticket.bulkCreate(tickets);
  await flights.forEach(async (flight, flightIndex) => {
    await flight.update({
      emptyPlaces: flight.emptyPlaces - passengerNumberPerFlight[flightIndex],
    });
  });
};

module.exports.deleteOne = async ({ body }) => {
  await Ticket.destroy({ where: { num: body.num } });
};
