/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import CreateRoomService from '../services/CreateRoomService';
import UpdateHostService from '../services/UpdateHostService';
import JoinRoomService from '../services/JoinRoomService';
import LeaveRoomService from '../services/LeaveRoomService';
import FindOneRoomService from '../services/FindOneRoomService';

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

  public async join(request: Request, response: Response): Promise<Response> {
    const { roomId } = request.params;

    const joinRoom = new JoinRoomService();

    const room = await joinRoom.execute({ userId: response.locals.id, roomId });

    return response.status(200).json({ room });
  }

  public async leave(request: Request, response: Response): Promise<Response> {
    const { roomId } = request.params;

    const leaveRoom = new LeaveRoomService();

    const room = await leaveRoom.execute({
      userId: response.locals.id,
      roomId,
    });

    return response.status(200).json({ room });
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { roomId } = request.params;

    const findOne = new FindOneRoomService();

    const room = await findOne.execute({ roomId });

    return response.status(200).json({ room });
  }
}

export default RoomsController;
