

export class Comment {
  constructor(data) {
    this.id = data.id || data._id;
    this.creatorId = data.creatorId;
    this.eventId = data.eventId;
    this.body = data.body;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.creator = data.creator;
  }
}