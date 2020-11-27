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
  const start = Date.now();
  const emptyPlaces = await flight.findOne({num: body.numFlight}).then((flight) => flight.dataValues.emptyPlaces)
  const passengerExists = await passenger.findOne({numero: body.numPassenger}).then((passenger) => passenger != undefined)
  const ticketNum = await getNewTicketNum()
  console.log(`t1: ${Date.now() - start}`);
  console.log(emptyPlaces)
  if (passengerExists && emptyPlaces > 0){
    try{
      await Ticket.create({
        num: ticketNum,
        date: body.date,
        price: body.price,
        numFlight: body.numFlight,
        numPassenger: body.numPassenger,
      });
      console.log(`t2: ${Date.now() - start}`);
      await flight.reduceEmptyPlaces({
        numFlight : body.numFlight,
        placesBought : 1
      })
      console.log(`Ticket n°${ticketNum} créé pour le passager ${body.numPassenger} pour le vol ${body.numFlight}.`)
      console.log(`t3: ${Date.now() - start}`);
    }catch(e){
      console.log(e)
    }
  }else{
    console.log(`Impossible de créer le ticket : le passager ${body.numPassenger} n'existe pas ou le vol ${body.numFlight} n'a plus de places`)
    // raise error
  }
};

module.exports.createFakePassengers = async ({body}) => {
  const start = Date.now();
  const numberOfPassengers = body.numberOfPassengers
  const emptyPlaces = await flight.findOne({num: body.numFlight}).then((flight) => flight.dataValues.emptyPlaces)
  const allPassengers = await passenger.readAll().then((res) => res.map((passenger) => passenger.numero))
  const passengers = getRandom(allPassengers,numberOfPassengers) // On prend aléatoirement n passagers dans la liste des passagers
  var ticketNum = await getNewTicketNum()
  if (emptyPlaces > numberOfPassengers){
    try{
      for (var i = 0; i < numberOfPassengers; i++){
        await Ticket.create({
          num: ticketNum + i,   // +i Important car il faut l'unicité des numéros
          date: body.date,
          price: body.price,
          numFlight: body.numFlight,
          numPassenger: passengers[i],
        });
        await flight.reduceEmptyPlaces({
          numFlight : body.numFlight,
          placesBought : 1
        })
        console.log(`Ticket n°${ticketNum + i} créé pour le passager ${passengers[i]} pour le vol ${body.numFlight}.`)
      }
    }catch(e){
      console.log(e)
    }
  }else{
    console.log(`Impossible de créer le ticket : le passager ${body.numPassenger} n'existe pas ou le vol ${body.numFlight} n'a plus de places`)
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

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}