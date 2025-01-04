import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { db } from '../datastore';
import { ExpressHandler, User } from '../types';

export const SignUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  if (!username || !firstName || !lastName || !email || !password) {
    res.status(400).json({ error: 'Missing user' });
    return;
  }
  const existingUser = await db.getUserByEmail(email);
  if (existingUser) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }
  const user: User = {
    id: crypto.randomUUID(),
    username,
    firstName,
    lastName,
    email,
    password,
  };
  await db.createUser(user);
  res.status(200).json({ user });
};
