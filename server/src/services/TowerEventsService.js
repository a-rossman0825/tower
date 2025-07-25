import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class TowerEventsService {
  
  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData);
    await towerEvent.populate('creator', 'name picture');
    await towerEvent.populate('ticketCount');
    
    return towerEvent;
  }
  
  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator', 'name picture').populate('ticketCount');
    
    return towerEvents;
  }
  
  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    .populate('creator', 'name picture').populate('ticketCount');
    
    if (!towerEvent) {
      throw new BadRequest(`Invalid id: ${towerEventId}`);
    }
    
    return towerEvent;
  }
  
  async editTowerEvent(towerEventId, towerEventEditData, userInfo) {
    const towerEvent = await this.getTowerEventById(towerEventId);
    const towerEventToEdit = await this.getTowerEventById(towerEventId);
    if (towerEventToEdit.isCanceled) {
      throw new BadRequest(`don't edit cancelled events, dweebus!`);
    }
    if (towerEvent.creatorId != userInfo.id) {
      throw new Forbidden(`You are trying to cancel someone else's event, and for that, you will be punished ${userInfo.name}!`);
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