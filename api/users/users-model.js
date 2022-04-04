const { intToBool } = require('../../utils');
const db = require('../data/db-config');

const findByEmail = async (email) => {
  const user = await db('users as u')
  .join('roles as r', 'r.role_id', 'u.role_id')
  .where({ 'u.email': email })
  .select()
  .first();

  if(user){
    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      email_confirmed: intToBool(user.email_confirmed),
      password: user.password,
      created_at: user.user_created_at,
      modified_at: user.user_modified_at,

      role: {
        role_id: user.role_id,
        name: user.role_name,
        description: user.role_description,
        created_at: user.role_created_at,
        modified_at: user.role_modified_at,
      }
    };

  } else {
    return null;
  }
  
}

module.exports = {
  findByEmail
}