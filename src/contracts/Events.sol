// SPDX-License-Identifier: GPL-3.0
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
    uint cost; // Wei
  }

  mapping(uint => Event) public events;

  constructor(Ticket _ticket) {
    ticket = _ticket;
    totalEvents = 0;
  }

  function createEvent(string memory _name, string memory _date, uint _capacity, uint _cost) public returns(Event memory) {
    totalEvents++;
    events[totalEvents] = Event(totalEvents, _name, _date, payable(msg.sender), _capacity, 0, _cost);
  }

  function buyTicket(uint _eventId, uint _numberOfTickets) external payable  {
    Event storage _event = events[_eventId];
    require(_event.attending + _numberOfTickets <= _event.capacity, "Not enough tickets available to satisfy this request.");

    uint tokenId = ticket.createTicket(msg.sender, _eventId);
    // Event important for logging purposes, helpful with testing
    emit Purchase(msg.sender, tokenId);
    _event.owner.transfer(msg.value);
    _event.attending = _event.attending + _numberOfTickets;
  }
}