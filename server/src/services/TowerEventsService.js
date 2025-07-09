import { dbContext } from "../db/DbContext.js";


class TowerEventsService {
  
  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData);
    await towerEvent.populate('creator', 'name picture');
    // TODO Event Ticket Count .populate 
    return towerEvent;
  }
  
  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator', 'name picture');
    return towerEvents;
  }
}

export const towerEventsService = new TowerEventsService();