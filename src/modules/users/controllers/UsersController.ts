/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import UserService from '../services/CreateUserService';
import GenerateTokenService from '../services/GenerateTokenService';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UpdateUserService from '../services/UpdateUserService';

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

  public async authenticate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUser = new AuthenticateUserService();
    const generateToken = new GenerateTokenService();

    const user = await authenticateUser.execute({ username, password });

    const token = await generateToken.execute({ id: user._id });

    return response.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        mobileToken: user.mobileToken,
      },
      token,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { password, mobileToken } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id: response.locals.id,
      password,
      mobileToken,
    });

    return response.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        mobileToken: user.mobileToken,
      },
    });
  }
}

export default UsersController;
