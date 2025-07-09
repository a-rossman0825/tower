import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { towerEventsService } from "../services/TowerEventsService.js";


export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
    .get('', this.getAllTowerEvents)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTowerEvent)
  }

  /**
   * @param {import ("express").Request} req
   * @param {import ("express").Response} res
   * @param {import ("express").NextFunction} next
   */
  async createTowerEvent(req, res, next) {
    try {
      const towerEventData = req.body;
      const userInfo = req.userInfo;
      towerEventData.creatorId = userInfo.id;
      const towerEvent = await towerEventsService.createTowerEvent(towerEventData);
      res.send(towerEvent);
    }
    catch (error){
      next(error);
    }
    
  }

  /**
   * @param {import ("express").Request} req
   * @param {import ("express").Response} res
   * @param {import ("express").NextFunction} next
   */
  async getAllTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAllTowerEvents();
      res.send(towerEvents);
    }
    catch (error){
      next(error);
    }
  }
}