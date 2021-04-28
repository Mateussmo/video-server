import { model, Document, Schema } from 'mongoose';

export interface IRoomsInterface extends Document {
  id: string;
  name: string;
  hostUser: string;
  users?: string[];
  capacity?: number;
}

const RoomsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hostUser: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    capacity: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
    collection: 'Rooms',
    versionKey: false,
  },
);

export default model<IRoomsInterface>('Rooms', RoomsSchema);
