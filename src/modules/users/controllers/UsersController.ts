/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import UserService from '../services/CreateUserService';
import GenerateTokenService from '../services/GenerateTokenService';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListAllUsersService from '../services/ListAllUsersServices';
import FindOneUserService from '../services/FindOneUserService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUser = new UserService();
    const generateToken = new GenerateTokenService();

    const userCreated = await createUser.execute({
      email,
      password,
    });

    if (!userCreated) throw new AppError('An Error Ocurred', 500);

    const token = await generateToken.execute({ id: userCreated._id });

    return response.status(201).json({
      user: {
        id: userCreated._id,
        email: userCreated.email,
      },
      token,
    });
  }

  public async authenticate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();
    const generateToken = new GenerateTokenService();

    const user = await authenticateUser.execute({ email, password });

    const token = await generateToken.execute({ id: user._id });

    return response.status(201).json({
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id: response.locals.id,
      password,
    });

    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute({ id: userId });

    return response.status(201).json({
      message: 'User deleted successfully!',
    });
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const listAllUsers = new ListAllUsersService();

    const users = await listAllUsers.execute();

    return response.status(200).json({
      users,
    });
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.params;
    const findOneUser = new FindOneUserService();

    const user = await findOneUser.execute({ email });

    return response.status(200).json({
      email: user.email,
    });
  }
}

export default UsersController;
