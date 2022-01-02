import { useContext, useEffect } from "react";
import { AccountsContext, ContractsContext } from "./_app";

export default () => {
  const { tickets } = useContext(ContractsContext),
    account = useContext(AccountsContext);

  useEffect(async () => {
    if (tickets && account) {
      const myTickets = await tickets.methods.balanceOf(account).call();
    }
  }, [tickets, account]);

  return <>TICKETS</>;
};
