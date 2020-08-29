/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import CreateRoomService from '../services/CreateRoomService';
import UpdateHostService from '../services/UpdateHostService';

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

  public async updateHost(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { currentHost, newHost } = request.body;

    const { roomId } = request.params;

    const updateHost = new UpdateHostService();

    const hostUpdated = await updateHost.execute({
      currentHost,
      newHost,
      userId: response.locals.id,
      roomId,
    });

    return response.status(200).json({ hostUpdated });
  }
}

export default RoomsController;
