import { useEffect, useState, createContext } from "react";
import Alert from "react-bootstrap/Alert";
import Web3 from "web3";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/layout";
import Events from "../../src/contract_artifacts/Events.json";
import Ticket from "../../src/contract_artifacts/Ticket.json";

export const AccountsContext = createContext();
export const ContractsContext = createContext();

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(""),
    [contracts, setContracts] = useState({}),
    [error, setError] = useState("");

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    window.web3 = web3;

    const [currentAccount] = await web3.eth.getAccounts(),
      networkId = await web3.eth.net.getId(),
      eventsContractData = Events.networks[networkId],
      ticketContractData = Ticket.networks[networkId];

    if (currentAccount && eventsContractData && ticketContractData) {
      const events = new web3.eth.Contract(
          Events.abi,
          eventsContractData.address
        ),
        tickets = new web3.eth.Contract(Ticket.abi, ticketContractData.address);

      setAccount(currentAccount);
      setContracts({ events, tickets });
    } else {
      setError(
        "There was an error. Ensure Metamask is installed and configured properly."
      );
    }
  }, []);

  return (
    <ContractsContext.Provider value={contracts}>
      <AccountsContext.Provider value={account}>
        <Layout>
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </AccountsContext.Provider>
    </ContractsContext.Provider>
  );
}

export default MyApp;
