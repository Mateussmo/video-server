/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import UserService from '../services/CreateUserService';
import GenerateTokenService from '../services/GenerateTokenService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { username, password, mobileToken } = request.body;

    const createUser = new UserService();
    const generateToken = new GenerateTokenService();

    const userCreated = await createUser.execute({
      username,
      password,
      mobileToken,
    });

    if (!userCreated) throw new AppError('An Error Ocurred', 500);

    const token = await generateToken.execute({ id: userCreated._id });

    return response.status(201).json({
      user: {
        id: userCreated._id,
        username: userCreated.username,
        mobileToken: userCreated.mobileToken,
      },
      token,
    });
  }
}

export default UsersController;
