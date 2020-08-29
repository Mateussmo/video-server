import { Request, Response } from 'express';

class UsersController {
  public async find(request: Request, response: Response): Promise<Response> {
    return response.json({});
  }
}

export default UsersController;
