import mongoose from 'mongoose';

import mongoConfig from '../../config/mongo';

const mongoUserPass = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}@`
  : '';

class Database {
  public mongoConnection: Promise<mongoose.Mongoose>;

  constructor() {
    this.init();
  }

  private init(): void {
    this.mongoConnection = mongoose.connect(
      `mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    );
  }
}

export default new Database();
