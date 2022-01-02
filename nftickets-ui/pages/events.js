import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { AccountsContext, ContractsContext } from "./_app";
import AddEventModal from "../components/AddEventModal";

export default () => {
  const { events } = useContext(ContractsContext),
    account = useContext(AccountsContext),
    [myEvents, setMyEvents] = useState([]),
    [allEvents, setAllEvents] = useState([]),
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
      setAllEvents(otherEvs);
    }
  }, [events, account]);

  return (
    <>
      <Col>
        <Row style={{ justifyContent: "center" }}>
          <Button style={{ width: 200 }} onClick={() => setShowModal(true)}>
            Add Event
          </Button>
        </Row>
        <Row>
          <h1>My Events ({myEvents.length})</h1>
        </Row>
        <Row>
          <h1>All Events ({allEvents.length})</h1>
        </Row>
      </Col>
      <AddEventModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        events={events}
        account={account}
      />
    </>
  );
};
