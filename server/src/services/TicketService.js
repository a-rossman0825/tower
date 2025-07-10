import { dbContext } from "../db/DbContext.js";


class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData);
    await ticket.populate('profile', 'name picture');
    await ticket.populate('event', 'ticketCount');

    return ticket;
  }

  async getTicketOwnersByAccountId(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('event');
    return tickets;
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture');
    return tickets;
  }

}

export const ticketsService = new TicketsService();