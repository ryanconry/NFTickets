const Events = artifacts.require("Events");
const Ticket = artifacts.require("Ticket");

module.exports = async function (deployer) {
  await deployer.deploy(Ticket);
  const ticket = await Ticket.deployed();

  await deployer.deploy(Events, ticket.address);
};
