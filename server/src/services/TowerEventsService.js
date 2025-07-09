import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";


class TowerEventsService {
  
  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData);
    await towerEvent.populate('creator', 'name picture');
    // TODO Event Ticket Count .populate 
    return towerEvent;
  }
  
  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator', 'name picture');
    // TODO Event Ticket Count .populate
    return towerEvents;
  }
  
  async getTowerEventById(towerEventId) {
    const towerEvent = (await dbContext.TowerEvents.findById(towerEventId)).populate('creator', 'name picture');

    if (!towerEvent) {
      throw new BadRequest(`Invalid id: ${towerEventId}`);
    }
    // TODO Event Ticket Count .populate 
    return towerEvent;
  }
}

export const towerEventsService = new TowerEventsService();