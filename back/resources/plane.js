const { Plane } = require.main.require("./model");
const { getRandomPlaneTypes } = require("../utils");

module.exports.findOne = async ({ body }) => {
  const plane = await Plane.findOne({
    where: { id: body.id },
  });
  return plane;
};
module.exports.readAll = async () => {
  const plane = await Plane.findAll();
  return plane;
};
module.exports.createOne = async ({ body }) => {
  await Plane.create({
    type: body.type,
    capacity: body.capacity,
  });
};
module.exports.createMany = async (list) => {
  if(list.length>0) {
    await Plane.bulkCreate(list);
  }
};
module.exports.deleteOne = async ({ body }) => {
  await Plane.destroy({ where: { id: body.id } });
};
module.exports.deleteAll = async () => {
  await Plane.destroy({ truncate : true });
};
module.exports.generateRandom = async (num = 10) => {

  await Plane.bulkCreate(getRandomPlaneTypes(num))

}