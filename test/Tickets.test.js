const { assert, expect } = require("chai");

const Ticket = artifacts.require("./Ticket.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Tickets", ([account1, account2, ...accounts]) => {
  let contract;

  before(async () => {
    contract = await Ticket.deployed();
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

  describe("interactions", () => {
    it("mints ticket", async () => {
      const result = await contract.createTicket(account1, 0),
        tokenId = result.logs[0].args.tokenId.toNumber();

      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 1);
      assert.equal(tokenId, 1);

      const tokenOwner = await contract.ownerOf(tokenId);
      assert.equal(tokenOwner, account1);
    });

    it("can not transfer unowned ticket", async () => {
      await expect(
        contract.safeTransferFrom(account2, account1, 1)
      ).to.be.rejectedWith(Error);
    });

    it("transfers ticket", async () => {
      const result = await contract.safeTransferFrom(account1, account2, 1),
        tokenId = result.logs[0].args.tokenId.toNumber(),
        tokenOwner = await contract.ownerOf(tokenId);

      assert.equal(tokenOwner, account2);
    });
  });
});
