import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class TowerEventsService {
  
  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData);
    await towerEvent.populate('creator', 'name picture');
    // TODO Event Ticket Count .populate 
    return towerEvent;
  }
  
  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator', 'name picture').populate('ticketCount');
    // TODO Event Ticket Count .populate
    return towerEvents;
  }
  
  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    .populate('creator', 'name picture').populate('ticketCount');
    
    if (!towerEvent) {
      throw new BadRequest(`Invalid id: ${towerEventId}`);
    }
    // TODO Event Ticket Count .populate 
    return towerEvent;
  }
  
  async editTowerEvent(towerEventId, towerEventEditData) {
    const towerEventToEdit = await this.getTowerEventById(towerEventId);
    if (towerEventToEdit.isCanceled) {
      throw new BadRequest(`don't edit cancelled events, dweebus!`);
    }
    towerEventToEdit.name = towerEventEditData.name ?? towerEventToEdit.name;
    towerEventToEdit.description = towerEventEditData.description ?? towerEventToEdit.description;
    towerEventToEdit.coverImg = towerEventEditData.coverImg ?? towerEventToEdit.coverImg;
    towerEventToEdit.location = towerEventEditData.location ?? towerEventToEdit.location;
    towerEventToEdit.capacity = towerEventEditData.capacity ?? towerEventToEdit.capacity;
    towerEventToEdit.startDate = towerEventEditData.startDate ?? towerEventToEdit.startDate;
    towerEventToEdit.type = towerEventEditData.type ?? towerEventToEdit.type;
    
    await towerEventToEdit.save();
    
    return towerEventToEdit;
  }
  
  async cancelTowerEvent(towerEventId, userInfo) {
    const towerEvent = await this.getTowerEventById(towerEventId);
    if (towerEvent.creatorId != userInfo.id) {
      throw new Forbidden(`You are trying to cancel someone else's event, and for that, you will be punished ${userInfo.name}!`);
    }
    towerEvent.isCanceled = !towerEvent.isCanceled;

    await towerEvent.save();

    return towerEvent;
  }
}

export const towerEventsService = new TowerEventsService();