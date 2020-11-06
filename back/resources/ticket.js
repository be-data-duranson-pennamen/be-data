const { Ticket } = require.main.require("./database");

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
  await Ticket.create({
    num: body.num,
    date: body.date,
    price: body.price,
    numFlight: body.numFlight,
    numPassenger: body.numPassenger,
  });
};
module.exports.deleteOne = async ({ body }) => {
  await Ticket.destroy({ where: { num: body.num } });
};
