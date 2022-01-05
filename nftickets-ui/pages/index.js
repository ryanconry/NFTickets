import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Home() {
  return (
    <Col>
      <Row style={{ justifyContent: "center" }}>
        <Image width={645} height={240} src="/logo.png" />
      </Row>
      <Row style={{ justifyContent: "center", textAlign: "center" }}>
        <h4>
          Welcome to NFTickets! The place to buy and trade tickets using the
          Ethereum Blockchain!
        </h4>
      </Row>
      <Row style={{ textAlign: "center" }}>
        <h6>
          Visit My Tickets page to view your tickets and transfer them to
          friends!
        </h6>
      </Row>
      <Row style={{ textAlign: "center" }}>
        <h6>
          The Events page is where you can create your own event and view events
          created by others!
        </h6>
      </Row>
    </Col>
  );
}
