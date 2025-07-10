

export class TicketProfile {
  constructor(data) {
    this.id = data.id || data._id;
    this.accountId = data.accountId;
    this.eventId = data.eventId;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.profile = data.profile;
  }
}