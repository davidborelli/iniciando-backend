import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error('There is already user with that e-mail');
    }

    const createdUser = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(createdUser);
    return createdUser;
  }
}

export default CreateUserService;
