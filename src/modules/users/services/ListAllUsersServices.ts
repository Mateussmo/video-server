import Users from '../schemas/Users';

interface IUserInterface {
  id: string;
  email: string;
}

class ListAllUsersService {
  public async execute(): Promise<IUserInterface[]> {
    const users = await Users.find();

    return users.map((user: IUserInterface) => ({
      id: user.id,
      email: user.email,
    }));
  }
}

export default ListAllUsersService;
