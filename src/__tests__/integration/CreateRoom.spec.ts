import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import Users from '../../modules/users/schemas/Users';
import CreateUserService from '../../modules/users/services/CreateUserService';
import GenerateTokenService from '../../modules/users/services/GenerateTokenService';
import Rooms from '../../modules/rooms/schemas/Rooms';

describe('Create Rooms', () => {
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

  it('Should create a Room', async () => {
    const createUser = new CreateUserService();
    const generateToken = new GenerateTokenService();

    const user = await createUser.execute({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const userToken = await generateToken.execute({ id: user._id });

    const response = await request(app)
      .post('/rooms')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'mateusmoreirav',
      });
    expect(response.status).toBe(201);
  });
  it('Should not create a Room when is given a name wrongly', async () => {
    const createUser = new CreateUserService();
    const generateToken = new GenerateTokenService();

    const user = await createUser.execute({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const userToken = await generateToken.execute({ id: user._id });

    const response = await request(app)
      .post('/rooms')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        naame: 'mateusmoreirav',
      });
    expect(response.status).toBe(422);
  });
});
