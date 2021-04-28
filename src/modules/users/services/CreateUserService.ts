import bcrypt from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import Users, { IUsersInterface } from '../schemas/Users';

interface IRequestDTO {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IUsersInterface> {
    const user = await Users.findOne({ email });

    if (user) {
      throw new AppError('This username already exists!', 409);
    }

    const userCreated = await Users.create({
      email,
      password: await bcrypt.hash(password, 10),
    });

    return userCreated;
  }
}

export default CreateUserService;
