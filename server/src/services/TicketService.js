import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


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

  async deleteTicket(ticketId, userInfo) {
    const ticket = await dbContext.Tickets.findById(ticketId);

    if (!ticket) {
      throw new BadRequest(`Invalid Id: ${ticketId}`);
    }
    if (userInfo.id != ticket.accountId) {
      throw new Forbidden(`THIS AIN'T YOURS, BUD! JAILTIME ${userInfo.nickname.toUpperCase()}!`);
    }

    await ticket.deleteOne();
  }

}

export const ticketsService = new TicketsService();