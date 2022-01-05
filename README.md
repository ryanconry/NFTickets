# NFTickets

## Set-up

Ganance, part of the Truffle Suite, will need to be installed and run to host your local Ethereum blockchain https://trufflesuite.com/ganache/. Once your local blockchain is running, ensure the settings match what is located in this project's truffle-config.js (Network ID: 5777, Address: localhost:8545). Note the wallet addresses listed in the Ganache blockchain, these will need to be added to your Ethereum wallet in the next step.

A broswer based Ethereum wallet will need to be installed in the broswer of your choice. During development, I have used Metamask (https://metamask.io/index.html). This wallet should be pointing to the local blockchain set up in the previous step. Add several of the accounts from the local blockchain to your wallet (More information can be found under the `Using Ganache with Metamask` section: https://medium.com/@kacharlabhargav21/using-ganache-with-remix-and-metamask-446fe5748ccf#:~:text=You%20need%20to%20provide%20your,now%20richer%20with%20100%20ether).

## Running the project

Clone this repository deploy the `Ticket` and `Events` smart contracts to your local blockchain:

```
cd nftickets/
npm i
npm run migrate
```

Next, start the client UI:

```
cd nftickets-ui/
npm i
npm run dev
```

Navigate to `localhost:3000` in your browser to access the UI. Try creating an event using an address in your wallet, switch to a different address in your wallet (reload for the application to register the change), and buy a ticket to the new event!
