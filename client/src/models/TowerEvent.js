

export class TowerEvent {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.location = data.location;
    this.capacity = data.capacity;
    this.ticketCount = data.ticketCount;
    this.startDate = new Date(data.startDate);
    this.isCanceled = data.isCanceled;
    this.type = data.type;
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.id = data.id || data._id;
    this.eventEmoji = this.eventEmojiGetter;
    this.emojiBG = this.eventEmojiBG;

  }
  get eventEmojiGetter() {
    let eventEmoji = '';
    switch (this.type) {
      case 'concert':
        eventEmoji = 'guitar-electric';
        break;
      case 'convention':
        eventEmoji = 'account-group';
        break;
      case 'sport':
        eventEmoji = 'football';
        break;
      case 'digital':
        eventEmoji = 'desktop-classic';
        break;
    }
    return eventEmoji;
  }

  get eventEmojiBG() {
    let emojiBG = '';
    switch (this.type) {
      case 'concert':
        emojiBG = 'warning';
        break;
      case 'convention':
        emojiBG = 'primary';
        break;
      case 'sport':
        emojiBG = 'success';
        break;
      case 'digital':
        emojiBG = 'danger';
        break;
    }
    return emojiBG;
  }

  get attendeeColor() {
    const capacity = this.capacity;
    const ticketsLeft = capacity - this.ticketCount;
    const percentLeft = (ticketsLeft / capacity) * 100;
    
    if (percentLeft <= 30) return 'danger';
    if (percentLeft <= 50) return 'yellow';
    return 'success';
  }



}