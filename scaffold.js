const childProcess = require('child_process')
const scafollder =  require('./src/scaffolders/generate')
const path = require('path')
const { argv } = require('process')

// console.log(process.argv)
let res = null
let options = {}
if(process.argv[2]){
    res = process.argv[2]
}
if(process.argv[3]){
    options = process.argv[3]
}
let scafollderPath = path.join('src','scaffolder','geenrate.js')
// console.log(scafollderPath);
// childProcess.exec('node -e "$scafollderPath.g(res,null,options)"')

childProcess.fork(scafollder.g(res,null,options),process.argv,process.options)