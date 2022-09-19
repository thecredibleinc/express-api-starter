import  { allFileActions, allFileActionsWithLevel } from "../../files/config/file.role";
// import roles

const allRoles = {
    admin: 1,
    staff: 2,
    player: 3
  };

  const allActions = {
    getUsers:'getUsers',
    manageUsers:'manageUsers',
    // allActions
    ...allFileActions
  }
  
  const allActionsWithLevel = {
    [allActions.getUsers]:3,
    [[allActions.manageUsers]]:1,
    // allActionsWithLevel
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