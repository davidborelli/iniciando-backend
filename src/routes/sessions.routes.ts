import { Router } from 'express';

import AuthenticationUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const autheticationUser = new AuthenticationUserService();
  const { user, token } = await autheticationUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
