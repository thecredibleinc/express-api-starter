const path = require('path');

const dev_env = function() {
  try{
    let pwds = process.env.PWD.split('/');
    return pwds[pwds.length - 1] === process.env.npm_package_name
  }catch(err){
    
  }
  
}

const test_console = function (...args) {
  // if(dev_env()) {
  //   console.log(...args)
  // }else{
    console.log(...args)
  // }
}

module.exports = test_console