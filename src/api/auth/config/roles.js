const allRoles = {
    admin: 1,
    staff: 2,
    player: 3,
    admin: ['getUsers', 'manageUsers'],
  };
  
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  
  module.exports = {
    roles,
    roleRights,
  };