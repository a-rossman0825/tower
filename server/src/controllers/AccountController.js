import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService.js'
import BaseController from '../utils/BaseController.js'
import { ticketsService } from '../services/TicketService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/tickets', this.getMyTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

    /**
  @param {import("express").Request} req
  @param {import("express").Response} res
  @param {import("express").NextFunction} next
  */
  async getMyTickets(req, res, next) {
    try {
      const userId = req.userInfo.id;
      const myTickets = await ticketsService.getTicketOwnersByAccountId(userId);
      res.send(myTickets);
    } catch (error) {
      next(error)
    }
  }
  
}
