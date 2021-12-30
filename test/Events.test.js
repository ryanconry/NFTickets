const { assert, expect } = require("chai");

const Events = artifacts.require("./Events.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Events", ([eventOwner, eventAttendee, ...accounts]) => {
  let contract;

  before(async () => {
    contract = await Events.deployed();
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
      const eventName = "Test Event",
        eventDate = "2021-12-23",
        eventCapacity = 2,
        ticketCost = web3.utils.toWei("0.01", "ether");

      await contract.createEvent(
        eventName,
        eventDate,
        eventCapacity,
        ticketCost
      );

      const totalEvents = await contract.totalEvents(),
        createdEvent = await contract.events(totalEvents);

      assert.equal(createdEvent.name, eventName);
      assert.equal(createdEvent.date, eventDate);
      assert.equal(createdEvent.owner, eventOwner);
      assert.equal(createdEvent.capacity, eventCapacity);
      assert.equal(createdEvent.attending, 0);
      assert.equal(createdEvent.cost, ticketCost);
    });

    it("rejects incorrect payment", async () => {
      await expect(
        contract.buyTicket(1, 2, {
          from: eventAttendee,
          value: web3.utils.toWei("0.015", "ether"),
        })
      ).to.be.rejectedWith(Error);
    });

    it("purchases event ticket", async () => {
      const balance = await web3.eth.getBalance(eventOwner),
        numberOfTickets = 2,
        eventId = await contract.totalEvents(),
        payment = web3.utils.toWei("0.02", "ether"),
        // Purchase ticket for eventId 1
        result = await contract.buyTicket(eventId, numberOfTickets, {
          from: eventAttendee,
          value: payment,
        }),
        { tokenId, attendee } = result.logs[0].args,
        event = await contract.events(eventId),
        newBalance = await web3.eth.getBalance(eventOwner),
        balanceDifference = (
          web3.utils.fromWei(newBalance) - web3.utils.fromWei(balance)
        ).toFixed(2);

      assert.equal(tokenId, 1);
      assert.equal(attendee, eventAttendee);
      assert.equal(balanceDifference, "0.02");
      assert.equal(event.attending.toNumber(), numberOfTickets);
    });

    it("rejects ticket purchase for sold out event", async () => {
      await expect(
        contract.buyTicket(1, 2, {
          from: eventAttendee,
          value: web3.utils.toWei("0.02", "ether"),
        })
      ).to.be.rejectedWith(Error);
    });
  });
});
