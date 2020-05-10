import { getRepository } from 'typeorm';
import fs from 'fs';

import uploadConfig from '../config/upload';
import path from 'path';
import User from '../models/User';

interface Request {
  uder_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ uder_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(uder_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
