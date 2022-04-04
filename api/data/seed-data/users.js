const bcrypt = require('bcryptjs');

const rounds = process.env.DB_ROUNDS 
? Number(process.env.DB_ROUNDS) 
: 8;

const userPassword = process.env.TEST_USER_PASSWORD || '1234';
const hash = bcrypt.hashSync(userPassword, rounds);

const users = [
  {
    username: 'Foo',
    email: 'foo@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    username: 'Bazz',
    email: 'bazz@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    username: 'Waldo',
    email: 'waldo@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    username: 'Fred',
    email: 'fred@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  }
]

module.exports = users;