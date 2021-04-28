import bcrypt from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import Users, { IUsersInterface } from '../schemas/Users';

interface IRequestDTO {
  username: string;
  password: string;
  mobileToken?: string;
}

class CreateUserService {
  public async execute({
    username,
    password,
    mobileToken,
  }: IRequestDTO): Promise<IUsersInterface> {
    const user = await Users.findOne({ username });

    if (user) {
      throw new AppError('This username already exists!', 409);
    }

    const userCreated = await Users.create({
      username,
      password: await bcrypt.hash(password, 10),
      mobileToken,
    });

    return userCreated;
  }
}

export default CreateUserService;
