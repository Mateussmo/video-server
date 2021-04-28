import bcrypt from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import Users, { IUsersInterface } from '../schemas/Users';

interface IRequestDTO {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IUsersInterface> {
    const user = await Users.findOne({ email });

    if (!user) throw new AppError('This username does not exists!', 404);

    if (!(await bcrypt.compare(password, user.password)))
      throw new AppError('Your password does not match!', 400);

    return user;
  }
}

export default AuthenticateUserService;
