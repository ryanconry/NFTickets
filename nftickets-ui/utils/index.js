export const mapTicketsToEvent = async (tickets, account, cb) => {
  const ticketEventMap = [];
  const ownedTicketsAmount = await tickets.methods.balanceOf(account).call();

  for (let i = 0; i < ownedTicketsAmount; i++) {
    const ticketId = await tickets.methods
      .tokenOfOwnerByIndex(account, i)
      .call();

    const eventId = await tickets.methods.eventMapping(ticketId).call();

    ticketEventMap.push({ ticketId, eventId });
  }
  return ticketEventMap;
};
