import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";


export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
    .get('', this.getAllTowerEvents)
    .get('/:eventId', this.getTowerEventById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTowerEvent)
    .put('/:eventId', this.editTowerEvent)
    .delete('/:eventId', this.cancelTowerEvent)
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

  /**
   * @param {import ("express").Request} req
   * @param {import ("express").Response} res
   * @param {import ("express").NextFunction} next
   */
  async getTowerEventById(req, res, next) {
    try {
      const towerEventId = req.params.eventId;
      const towerEvent = await towerEventsService.getTowerEventById(towerEventId);
      res.send(towerEvent);
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import ("express").Request} req
   * @param {import ("express").Response} res
   * @param {import ("express").NextFunction} next
   */
  async editTowerEvent(req, res, next) {
    try {
      const towerEventId = req.params.eventId;
      const towerEventEditData = req.body;
      const towerEvent = await towerEventsService.editTowerEvent(towerEventId, towerEventEditData);
      res.send(towerEvent);
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import ("express").Request} req
   * @param {import ("express").Response} res
   * @param {import ("express").NextFunction} next
   */
  async cancelTowerEvent(req, res, next) {
    try {
      const towerEventId = req.params.eventId;
      const userInfo = req.userInfo;
      const towerEvent = await towerEventsService.cancelTowerEvent(towerEventId, userInfo);
      res.send(towerEvent);
    } catch (error) {
      next(error)
    }
  }
}