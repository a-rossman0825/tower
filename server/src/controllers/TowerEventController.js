import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";


export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTowerEvent)
  }

  async createTowerEvent() {
    try {
      
    }
    catch (error){
      Pop
    }
  }
}