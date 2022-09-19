import  { allFileActions, allFileActionsWithLevel } from "../../files/config/file.role";
// import roles

const allRoles = {
    admin: 1,
    staff: 2,
    player: 3
  };

// allActions
  const allActions = {
    getUsers:'getUsers',
    manageUsers:'manageUsers',
    ...allFileActions
  }

// allActionsWithLevel
  const allActionsWithLevel = {
    [allActions.getUsers]:3,
    [[allActions.manageUsers]]:1,
    ...allFileActionsWithLevel
  }
  

  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  const actionRights = new Map(Object.entries(allActions));
  
  module.exports = {
    roles,
    roleRights,
    actionRights,
    allRoles,
    allActions,
    allActionsWithLevel
  };