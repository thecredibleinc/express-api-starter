const allRoles = {
    admin: 1,
    staff: 2,
    player: 3
  };

  const allActions = {
    'getUsers':2 ,
    'manageUsers':2
  }
  
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  const actionRights = new Map(Object.entries(allActions));
  
  module.exports = {
    roles,
    roleRights,
    actionRights,
    allRoles,
    allActions
  };