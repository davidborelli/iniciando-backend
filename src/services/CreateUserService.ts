import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

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
      throw new AppError('There is already user with that e-mail');
    }

    const hashedPassword = await hash(password, 8);

    const createdUser = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(createdUser);
    return createdUser;
  }
}

export default CreateUserService;
