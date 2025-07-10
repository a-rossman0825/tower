import { Schema } from "mongoose";


export const TowerEventSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account'},
    name: { type: String, minlength: 3, maxlength: 50, required: true },
    description: { type: String, minlength: 15, maxlength: 1000, required: true },
    coverImg: { type: String, maxlength: 500, required: true },
    location: { type: String, minlength: 1, maxlength: 500, required: true },
    capacity: { type: Number, min: 1, max: 5000, required: true },
    // ticketCount: {type: Number, min: 0, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

// TowerEventSchema.virtual('ticketCount', {
//   localField: '_id',
//   foreignField: 'eventId',
//   ref: 'Ticket',
//   justOne: false,
//   count: true
// })