const { Plane } = require.main.require("./database");
const sequelize =  require("sequelize");

module.exports.findOne = async ({ body }) => {
  const plane = await Plane.findOne({
    where: { numPlane: body.numPlane },
  });
  return plane;
};
module.exports.readAll = async () => {
  const plane = await Plane.findAll();
  return plane;
};
module.exports.createOne = async ({ body }) => {
  await Plane.create({
    numPlane: body.numPlane,
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
  await Plane.destroy({ where: { numPlane: body.numPlane } });
};

module.exports.getNewPlaneNum = async () => {
  const res = await Plane.findAll({
    attributes: [[sequelize.fn('MAX', sequelize.col('numPlane')), 'max_num']]
  })
  return 1 + Number(res[0].dataValues.max_num)
}