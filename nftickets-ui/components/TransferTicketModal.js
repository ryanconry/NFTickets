import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default ({
  show,
  handleClose,
  tickets,
  transferTicket,
  account,
  setTransferSuccess,
}) => {
  const [transferAddress, setTransferAddress] = useState(""),
    _handleClose = () => {
      setTransferAddress("");
      handleClose();
    },
    handleTransfer = async () => {
      try {
        await tickets.methods
          .safeTransferFrom(account, transferAddress, parseInt(transferTicket))
          .send({ from: account });
        _handleClose();
        setTransferSuccess(true);
      } catch (e) {
        console.error(e);
      }
    };

  return (
    <Modal
      show={show}
      onHide={_handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>Transfer Ticket</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="form-group">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={transferAddress}
              onChange={(e) => {
                setTransferAddress(e.target.value);
              }}
              placeholder="ex. 0xD410E0B81FF8F190173D03CA61794C0989EF4495"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={_handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleTransfer}
          disabled={
            !transferAddress || !transferAddress.match(/^0x[a-fA-F0-9]{40}$/)
          }
        >
          Transfer Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
