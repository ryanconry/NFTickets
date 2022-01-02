import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import { AccountsContext } from "../pages/_app";

export default ({ children }) => {
  const account = useContext(AccountsContext);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>NFTickets</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link href="/tickets" passHref>
              <Nav.Link>My Tickets</Nav.Link>
            </Link>
            <Link href="/events" passHref>
              <Nav.Link>Events</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Nav.Item
              style={{ alignSelf: "center" }}
            >{`Account: ${account}`}</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container style={{ padding: "20px 0" }}>
        <main>{children}</main>
      </Container>
    </>
  );
};
