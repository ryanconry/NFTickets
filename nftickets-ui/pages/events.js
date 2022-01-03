import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { AccountsContext, ContractsContext } from "./_app";
import CreateEventModal from "../components/CreateEventModal";
import EventCard from "../components/EventCard";

export default () => {
  const { events } = useContext(ContractsContext),
    account = useContext(AccountsContext),
    [myEvents, setMyEvents] = useState([]),
    [otherEvents, setOtherEvents] = useState([]),
    [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    if (events && account) {
      const totalEventsData = await events.methods.totalEvents().call(),
        totalEvents = parseInt(totalEventsData),
        myEvs = [],
        otherEvs = [];

      for (let i = 1; i <= totalEvents; i++) {
        const event = await events.methods.events(i).call();
        event.owner === account ? myEvs.push(event) : otherEvs.push(event);
      }

      setMyEvents(myEvs);
      setOtherEvents(otherEvs);
    }
  }, [events, account]);

  return (
    <>
      <Col>
        <Row style={{ justifyContent: "center" }}>
          <Button
            style={{ marginTop: 20, width: 200 }}
            onClick={() => setShowModal(true)}
          >
            Create Event
          </Button>
        </Row>
        <Row>
          <h1 style={{ marginBottom: 20 }}>My Events ({myEvents.length})</h1>
          {myEvents.map((event, i) => (
            <EventCard key={i} isOwnEvent event={event} />
          ))}
        </Row>
        <Row>
          <h1 style={{ marginBottom: 20 }}>
            Other Events ({otherEvents.length})
          </h1>
          {otherEvents.map((event, i) => (
            <EventCard
              key={i}
              event={event}
              events={events}
              account={account}
            />
          ))}
        </Row>
      </Col>
      <CreateEventModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        events={events}
        account={account}
      />
    </>
  );
};
