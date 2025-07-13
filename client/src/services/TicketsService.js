import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js"
import { TicketedEvent, TicketProfile } from "@/models/Ticket.js";
import { AppState } from "@/AppState.js";
import { TowerEvent } from "@/models/TowerEvent.js";


class TicketsService {
  async deleteTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`);
    logger.log('Deleted Ticket', res.data)
  }
  
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

  async getMyTicketedEvents() {
    const res = await api.get('account/tickets');
    logger.log('got my ticketed events!', res.data);
    const events = res.data.map((pojo) => new TicketedEvent(pojo));
    AppState.ticketedEvents = events;
  }

}

export const ticketsService = new TicketsService()