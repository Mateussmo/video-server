/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import CreateRoomService from '../services/CreateRoomService';

class RoomsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, capacity } = request.body;
    const createRoom = new CreateRoomService();

    const room = await createRoom.execute({
      name,
      capacity,
      userId: response.locals.id,
    });

    return response.status(201).json({ room });
  }
}

export default RoomsController;
