const { rejects } = require('assert');
const {exec} = require('child_process');
const { resolve } = require('path');
const execCPP = (raasta) =>{
    const filePath = raasta.split(`^$#^`)
    //?   filePath[0] = path
    //?   filePath[1] = filename(with extension)
    console.log(`cd c:\Users\STEVEN\Desktop\codin\LIveCode-beta/code_modules && g++ rename.cpp`)
    return new Promise((resolve, reject)=>{
        exec(`cd ${filePath[0]} && g++ ${filePath[1]}`, (error, stdout, stderr)=>{
            if(error) {
                reject({error, stderr});
            }
            if(stderr) {
                reject(stderr);
            }
            resolve(stdout);
        })
    })
    }
module.exports = {
    execCPP,
};