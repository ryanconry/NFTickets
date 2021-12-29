pragma solidity ^0.8.0;

contract NFTickets {
  uint public totalEvents;
  mapping(address => bool) attendees;

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

  constructor() {
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

}