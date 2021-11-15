import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Misha',
    email: 'misha@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sasha',
    email: 'sasha@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
