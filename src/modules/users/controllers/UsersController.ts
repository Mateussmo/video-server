import { Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import UserService from '../services/CreateUserService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { username, password, mobileToken } = request.body;

    const createUser = new UserService();

    const userCreated = await createUser.execute({
      username,
      password,
      mobileToken,
    });

    if (!userCreated) throw new AppError('An Error Ocurred', 500);

    return response.status(201).json({ message: 'User Created!' });
  }
}

export default UsersController;
