import AppError from '../../../shared/errors/AppError';
import Users from '../schemas/Users';

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
  }: IRequestDTO): Promise<IRequestDTO> {
    const user = await Users.findOne({ username });

    if (user) {
      throw new AppError('This username already exists!', 409);
    }

    const userCreated = await Users.create({
      username,
      password,
      mobileToken,
    });

    return userCreated;
  }
}

export default CreateUserService;
