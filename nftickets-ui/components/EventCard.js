import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { mapTicketsToEvent } from "../utils";

const result = {
  success: {
    variant: "success",
    text: "Success!",
  },
  error: {
    variant: "danger",
    text: "Error",
  },
};

export default ({ event, isOwnEvent, events, account, tickets }) => {
  const [purchaseResult, setPurchaseResult] = useState({}),
    [isAttendingEvent, setIsAttendingEvent] = useState(false),
    isEventFull = event.attending === event.capacity,
    purchaseTicket = async () => {
      try {
        await events.methods
          .buyTicket(event.id, 1)
          .send({ from: account, value: event.cost })
          .on("receipt", () => setPurchaseResult(result.success));
      } catch (e) {
        console.error(e);
        setPurchaseResult(result.error);
      }
    },
    buttonData = { variant: "primary", text: "Purchase" };

  if (isOwnEvent) {
    buttonData.text = "Owned";
  } else if (isAttendingEvent) {
    buttonData.variant = "success";
    buttonData.text = "Attending";
  } else if (isEventFull) {
    buttonData.text = "Sold Out";
  }

  useEffect(async () => {
    if (tickets && account) {
      const ownedTickets = await mapTicketsToEvent(tickets, account);
      ownedTickets.forEach(({ eventId }) => {
        eventId === event.id && setIsAttendingEvent(true);
      });
    }
  }, [purchaseResult]);

  return (
    <Card style={{ width: "18rem", padding: 0, marginRight: 20 }}>
      <Card.Body>
        <Card.Img variant="top" src="/logo.png" />
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          Date: {event.date} <br />
          Capacity: {event.capacity} <br />
          {isOwnEvent ? (
            <>
              Earnings:{" "}
              {window.web3.utils.fromWei(event.cost, "ether") * event.attending}{" "}
              Ether <br />
              Attending: {event.attending}
            </>
          ) : (
            `Cost: ${window.web3.utils.fromWei(event.cost, "ether")} Ether`
          )}
        </Card.Text>
        {purchaseResult?.text ? (
          <Alert
            style={{ margin: "5px 0 0", padding: "0.5rem" }}
            variant={purchaseResult.variant}
          >
            {purchaseResult.text}
          </Alert>
        ) : (
          <div style={{ height: 47 }} />
        )}
      </Card.Body>
      <Card.Footer style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant={buttonData.variant}
          onClick={() => purchaseTicket()}
          disabled={isOwnEvent || isAttendingEvent || isEventFull}
        >
          {buttonData.text}
        </Button>
      </Card.Footer>
    </Card>
  );
};
