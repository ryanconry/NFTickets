pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ticket is ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(uint => uint) eventMapping;

    constructor() ERC721("NFTicket", "NFTKT") {
    }

    function createTicket(address attendee, uint eventId) public returns(uint) {
      _tokenIds.increment();

      uint ticketId = _tokenIds.current();
      _safeMint(attendee, ticketId);
      eventMapping[ticketId] = eventId;

      return ticketId;
    }
}