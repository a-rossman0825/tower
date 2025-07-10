import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketService.js";


export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTicket)
  }

  /**
  @param {import("express").Request} req
  @param {import("express").Response} res
  @param {import("express").NextFunction} next
  */
  async createTicket(req, res, next) {
    try {
      const ticketData = req.body;
      const userId = req.userInfo.id;
      ticketData.accountId = userId;
      const ticket = await ticketsService.createTicket(ticketData);
      res.send(ticket);
    } catch (error) {
      next (error)
    }
  }


}