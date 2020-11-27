const { Ticket } = require.main.require("./database");
const flight = require("./flight")
const passenger = require("./passenger")
const sequelize =  require("sequelize");

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
  const emptyPlaces = await flight.findOne({num: body.numFlight}).then((flight) => flight.dataValues.emptyPlaces)
  const passengerExists = await passenger.findOne({numero: body.numPassenger}).then((passenger) => passenger != undefined)
  const ticketNum = await getNewTicketNum()
  if (passengerExists && emptyPlaces > 0){
    try{
      await Ticket.create({
        num: ticketNum,
        date: body.date,
        price: body.price,
        numFlight: body.numFlight,
        numPassenger: body.numPassenger,
      });
      await flight.reduceEmptyPlaces({
        numFlight : body.numFlight,
        placesBought : 1
      })
      console.log(`Ticket n°${ticketNum} créé pour le passager ${body.numPassenger} pour le vol ${body.numFlight}.`)
    }catch(e){
      console.log(e)
    }
  }else{
    // raise error
  }
  
};
module.exports.deleteOne = async ({ body }) => {
  await Ticket.destroy({ where: { num: body.num } });
};

const getNewTicketNum = async () => {
  const res = await Ticket.findAll({
    attributes: [[sequelize.fn('MAX', sequelize.col('num')), 'max_num']]
  })
  return 1 + Number(res[0].dataValues.max_num)
}