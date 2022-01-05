import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AccountsContext, ContractsContext } from "./_app";
import { mapTicketsToEvent } from "../utils";

export default () => {
  const { tickets, events } = useContext(ContractsContext),
    account = useContext(AccountsContext),
    [myTickets, setMyTickets] = useState([]),
    [transferSuccess, setTransferSuccess] = useState(false);

  useEffect(async () => {
    if (tickets && account) {
      const ownedTickets = await mapTicketsToEvent(tickets, account);

      for (let i = 0; i < ownedTickets.length; i++) {
        const { eventId } = ownedTickets[i],
          event = await events.methods.events(eventId).call();
        ownedTickets[i].eventName = event.name;
      }
      setMyTickets(ownedTickets);
    }
  }, [tickets, account]);

  return (
    <>
      <Col>
        <Row>
          <h1>My Tickets ({myTickets.length})</h1>
          {myTickets.map(({ ticketId, eventName }) => (
            <Card
              key={ticketId}
              style={{ width: "24rem", padding: 0, marginRight: 20 }}
            >
              <Card.Body>
                <Card.Text>
                  Ticket ID: {ticketId}
                  <br />
                  Event: {eventName}
                </Card.Text>
              </Card.Body>
              <Card.Footer
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button>Transfer</Button>
              </Card.Footer>
            </Card>
          ))}
        </Row>
      </Col>
    </>
  );
};
