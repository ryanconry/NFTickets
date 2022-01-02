import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";

export default ({ showModal, handleClose, events, account }) => {
  const [eventName, setEventName] = useState(""),
    [date, setDate] = useState(""),
    [isInvalidDate, setIsInvalidDate] = useState(false),
    [capacity, setCapacity] = useState(0),
    [cost, setCost] = useState(0),
    handleSubmit = async () => {
      await events.methods
        .createEvent(
          eventName,
          date,
          capacity,
          window.web3.utils.toWei(`${cost}`, "ether")
        )
        .send({ from: account })
        .on("receipt", handleClose);
    },
    submitDisabled = !eventName || !date || isInvalidDate || !capacity || !cost;

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>Add Event</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="form-group">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder=" ex. Fun Time Festival"
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="text"
              value={date}
              onChange={(e) => {
                const { value } = e.target,
                  valueMoment = moment(value);
                if (
                  value &&
                  (!value.match(/^\d{4}-\d{2}-\d{2}$/) ||
                    !valueMoment.isValid() ||
                    valueMoment.isBefore(moment().startOf("day")))
                ) {
                  !isInvalidDate && setIsInvalidDate(true);
                } else {
                  isInvalidDate && setIsInvalidDate(false);
                }
                setDate(value);
              }}
              placeholder="ex. 2022-06-01"
              isInvalid={isInvalidDate}
            />
            <Form.Text muted>
              Date can not be in the past. Format: YYYY-MM-DD
            </Form.Text>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Event Capacity</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={capacity}
              onChange={(e) => {
                const { value } = e.target,
                  cap = value !== "" ? parseFloat(value) : value;
                setCapacity(cap);
              }}
              onBlur={() => capacity === "" && setCapacity(0)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Ticket Cost</Form.Label>
            <Form.Control
              type="number"
              min={0.0}
              step={0.00001}
              value={cost}
              onChange={(e) => {
                const { value } = e.target,
                  ticketCost = value !== "" ? parseFloat(value) : value;
                setCost(ticketCost);
              }}
              onBlur={() => cost === "" && setCost(0)}
            />
            <Form.Text>In Ether</Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={submitDisabled}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
