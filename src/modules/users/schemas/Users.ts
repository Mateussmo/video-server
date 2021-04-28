import { model, Document, Schema } from 'mongoose';

export interface IUsersInterface extends Document {
  id: string;
  email: string;
  password: string;
}

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Users',
    versionKey: false,
  },
);

export default model<IUsersInterface>('Users', UsersSchema);
