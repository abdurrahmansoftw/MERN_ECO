import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'AbdurRahman',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'akaid',
    email: 'akaid@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Abdur Rahman',
    email: 'user@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
