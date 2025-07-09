import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { TowerEvent } from "@/models/TowerEvent.js";
import { AppState } from "@/AppState.js";



class TowerEventsService {
  async getTowerEvents() {
    const res = await api.get('api/events');
    logger.log('Got Events!', res.data);
    const towerEvents = res.data.map((pojo) => new TowerEvent(pojo));
    AppState.towerEvents = towerEvents;
  }

  async getTowerEventById(towerEventId) {
    AppState.towerEvent = null;
    const res = await api.get(`api/events/${towerEventId}`);
    logger.log('Got Event By ID!', res.data);
    const towerEvent = new TowerEvent(res.data);
    AppState.towerEvent = towerEvent;
  }
}

export const towerEventsService = new TowerEventsService();