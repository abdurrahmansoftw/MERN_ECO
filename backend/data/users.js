import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'AbdurRahman',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123', 10),
    isAdmin: true,
  },
  {
    name: 'akaid',
    email: 'akaid@email.com',
    password: bcrypt.hashSync('123', 10),
    isAdmin: true,
  },
  {
    name: 'Abdur Rahman',
    email: 'user@email.com',
    password: bcrypt.hashSync('123', 10),
  },
]

export default users
