const { Ticket } = require.main.require("./database");
const flight = require("./flight")
const passenger = require("./passenger")

module.exports.findOne = async ({ body }) => {
  const ticket = await Ticket.findOne({
    where: { num: body.num },
  });
  return ticket;
};
module.exports.readAll = async () => {
  const ticket = await Ticket.findAll();
  return ticket;
};
module.exports.createOne = async ({ body }) => {
  const emptyPlaces = await flight.findOne({num: body.num})[0].emptyPlaces
  const passengerExists = await passenger.findOne({numero: body.numPassenger}).length == 0
  if (passengerExists && emptyPlaces > 0){
    await Ticket.create({
      num: body.num,
      date: body.date,
      price: body.price,
      numFlight: body.numFlight,
      numPassenger: body.numPassenger,
    });
    await flight.reduceEmptyPlaces({
      numFlight : body.numFlight,
      placesBought : 1
    })
  }else{
    // raise error
  }
  
};
module.exports.deleteOne = async ({ body }) => {
  await Ticket.destroy({ where: { num: body.num } });
};
