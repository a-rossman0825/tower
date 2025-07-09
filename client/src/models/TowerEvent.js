

export class TowerEvent {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.location = data.location;
    this.capacity = data.capacity;
    this.startDate = new Date(data.startDate);
    this.isCancelled = data.isCancelled;
    this.type = data.type;
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.id = data.id || data._id;
  }
}