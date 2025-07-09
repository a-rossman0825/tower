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


}

export const towerEventsService = new TowerEventsService();