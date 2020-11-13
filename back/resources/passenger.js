const { Passenger } = require.main.require("./database");

module.exports.findOne = async ({ body }) => {
  const passenger = await Passenger.findOne({
    where: { numero: body.numero },
  });
  return passenger;
};
module.exports.readAll = async () => {
  const passenger = await Passenger.findAll();
  return passenger;
};
module.exports.createOne = async ({ body }) => {
  await Passenger.create({
    numero: body.numero,
    firstName: body.firstName,
    lastName: body.lastName,
    address: body.address,
  });
};
module.exports.createMany = async (list) => {
  if(list.length>0) {
    await Passenger.bulkCreate(list);
  }
};
module.exports.deleteOne = async ({ body }) => {
  await Passenger.destroy({ where: { numero: body.numero } });
};

module.exports.getAllSecuNum = async () => {
  const output = await Passenger.findAll()
  return output.map(x => x.secuNum)
}
