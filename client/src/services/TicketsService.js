import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js"
import { TicketProfile } from "@/models/Ticket.js";
import { AppState } from "@/AppState.js";


class TicketsService {


  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`);
    logger.log('got Tickets', res.data);
    const tickets = res.data.map((pojo) => new TicketProfile(pojo));
    AppState.ticketProfiles = tickets;
  }

}

export const ticketsService = new TicketsService()