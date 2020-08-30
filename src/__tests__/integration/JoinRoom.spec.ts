import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import Users from '../../modules/users/schemas/Users';
import CreateUserService from '../../modules/users/services/CreateUserService';
import GenerateTokenService from '../../modules/users/services/GenerateTokenService';
import CreateRoomService from '../../modules/rooms/services/CreateRoomService';
import Rooms from '../../modules/rooms/schemas/Rooms';

describe('Join the Room', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_DATABASE) {
      throw new Error('Mongo DB server not intiliazed');
    }

    await mongoose.connect(process.env.MONGO_DATABASE, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Users.deleteMany({});
    await Rooms.deleteMany({});
  });

  it('Should join the Room', async () => {
    const createUser = new CreateUserService();
    const generateToken = new GenerateTokenService();
    const createRoom = new CreateRoomService();

    const user = await createUser.execute({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const userToken = await generateToken.execute({ id: user._id });

    const room = await createRoom.execute({
      name: 'Room One',
      userId: user._id,
      capacity: 7,
    });

    const response = await request(app)
      .patch(`/rooms/${room._id}/join`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
  });
});
