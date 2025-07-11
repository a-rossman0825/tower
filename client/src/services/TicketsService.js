import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js"
import { TicketProfile } from "@/models/Ticket.js";
import { AppState } from "@/AppState.js";


class TicketsService {
  


  async getTicketsByEventId(eventId) {
    AppState.ticketProfiles = [];
    const res = await api.get(`api/events/${eventId}/tickets`);
    logger.log('got Tickets', res.data);
    const tickets = res.data.map((pojo) => new TicketProfile(pojo));
    AppState.ticketProfiles = tickets;
  }

  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData);
    logger.log('Created Ticket', res.data);
    const ticket = new TicketProfile(res.data);
    AppState.ticketProfiles.push(ticket);
    AppState.towerEvent.ticketCount++;
  }

}

export const ticketsService = new TicketsService()