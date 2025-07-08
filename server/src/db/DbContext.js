import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { TowerEventSchema } from '../models/TowerEvent.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  TowerEvent = mongoose.model('TowerEvent',TowerEventSchema);
}

export const dbContext = new DbContext()
