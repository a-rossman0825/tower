import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";



class TowerEventsService {
  
  async getTowerEvents() {
    const res = await api.get('api/events');
    logger.log('Got Events!', res.data);
  }


}

export const towerEventsService = new TowerEventsService();