import { Router } from 'express';

import AuthenticationUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const autheticationUser = new AuthenticationUserService();
    const { user } = await autheticationUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionRouter;
