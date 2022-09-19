const allFileActions = {
    getFile:'getFile',
    manageFile:'manageFile'
  }
  
  const allFileActionsWithLevel = {
    [allFileActions.getFile]:3,
    [[allFileActions.manageFile]]:1
  }

  export {
    allFileActions,allFileActionsWithLevel
  }
