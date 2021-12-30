pragma solidity ^0.8.0;

import "./Ticket.sol";

contract Events {
  uint public totalEvents;
  Ticket private ticket;
  event Purchase(address attendee, uint tokenId);

  struct Event {
    uint id;
    string name;
    string date;
    address payable owner;
    uint capacity;
    uint attending;
    mapping(address => bool) attendees;
    uint cost; // Wei
  }

  mapping(uint => Event) public events;

  constructor(Ticket _ticket) {
    ticket = _ticket;
    totalEvents = 0;
  }

  function createEvent(string memory _name, string memory _date, uint _capacity, uint _cost) public  {
    totalEvents++;
    Event storage e = events[totalEvents];
    e.id=totalEvents;
    e.name = _name;
    e.date = _date;
    e.owner = payable(msg.sender);
    e.capacity = _capacity;
    e.attending = 0;
    e.cost = _cost;
  }

  function buyTicket(uint _eventId, uint _numberOfTickets) external payable  {
    Event storage _event = events[_eventId];
    require(msg.value == _numberOfTickets * _event.cost, "Transfer the exact amount of the requested tickets.");
    require(_event.attending + _numberOfTickets <= _event.capacity, "Not enough tickets available to satisfy this request.");

    uint tokenId = ticket.createTicket(msg.sender, _eventId);
    emit Purchase(msg.sender, tokenId);
    _event.owner.transfer(msg.value);
    _event.attending += _numberOfTickets;
  }

}