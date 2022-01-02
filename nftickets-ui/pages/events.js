import Web3 from "web3";
import { useContext, useEffect } from "react";
import { AccountsContext, ContractsContext } from "./_app";

export default () => {
  const { events } = useContext(ContractsContext),
    account = useContext(AccountsContext);

  useEffect(async () => {
    if (events && account) {
      // const eventName = "Test Event",
      //   eventDate = "2022-01-23",
      //   eventCapacity = 200,
      //   ticketCost = window.web3.utils.toWei("0.01", "ether");

      // await events.methods
      //   .createEvent(eventName, eventDate, eventCapacity, ticketCost)
      //   .send({ from: account })
      //   .on("receipt", () => console.log("added"));

      const totalEvents = await events.methods.totalEvents().call(),
        event = await events.methods.events(totalEvents).call();
    }
  }, [events, account]);

  return <div>EVENTS</div>;
};
