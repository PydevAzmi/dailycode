import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { db } from '../datastore';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ExpressHandler, tokenPayload, User } from '../types';

export const SignInHandler :ExpressHandler<SignInRequest, SignInResponse> = async (req, res) =>{
  const { login, password } = req.body;
  if (!login || !password) {
    res.status(400).json({ error: 'Missing login or password' });
    return;
  }
  const user = await db.getUserByEmail(login) || await db.getUserByUsername(login);
  if (!user || user.password !== hashPassword(password)) {
    res.status(401).json({ error: 'Invalid login or password' });
    return;
  }
  const token =  generateToken(user);
  res.status(200).json({user:{
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }, token });
}


export const SignUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  if (!username || !firstName || !lastName || !email || !password) {
    res.status(400).json({ error: 'Missing user' });
    return;
  }
  const existingUser = await db.getUserByEmail(email) ||  await db.getUserByUsername(username);;
  if (existingUser) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }
  
  const user = {
    id: crypto.randomUUID(),
    username,
    firstName,
    lastName,
    email,
    password: hashPassword(password)
  };

  await db.createUser(user);
  const token =  generateToken(user);
  res.status(200).json({user:{
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }, token });
};


const generateToken = (user: User) => {
  const token = jwt.sign({ id: user.id , username: user.username}, getSecretKey(), { expiresIn: '1d' });
  return token;
};

const hashPassword = (password: string) => {
  const salt = process.env.SALT_PASS! ;
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash as string;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, getSecretKey()) ;
  return decoded as tokenPayload;
};

const getSecretKey= () => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error('JWT_SECRET is not defined');
    process.exit(1);
  }
  return secretKey;
};