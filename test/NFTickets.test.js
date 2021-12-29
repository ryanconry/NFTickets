const { assert } = require("chai");

const NFTickets = artifacts.require("./NFTickets.sol");

require("chai").use(require("chai-as-promised")).should();

contract("NFTickets", (accounts) => {
  let contract;

  before(async () => {
    contract = await NFTickets.deployed();
  });

  describe("deployement", () => {
    it("is deployed", () => {
      const { address } = contract;
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
    });
  });

  describe("events", () => {
    it("no events initially", async () => {
      const totalEvents = await contract.totalEvents();
      assert.equal(totalEvents, 0);
    });

    it("is created", async () => {
      await contract.createEvent("Test Event", "2021-12-23", 200, 200);
      const totalEvents = await contract.totalEvents(),
        createdEvent = await contract.events(totalEvents);

      assert.equal(createdEvent.name, "Test Event");
      assert.equal(createdEvent.date, "2021-12-23");
      assert.equal(createdEvent.owner, accounts[0]);
      assert.equal(createdEvent.capacity, 200);
      assert.equal(createdEvent.attending, 0);
      assert.equal(createdEvent.cost, 200);
    });
  });
});
