const {exec} = require('child_process');
const execC = (raasta) =>{
    const filePath = raasta.split(`^$#^`)
    //?   filePath[0] = path
    //?   filePath[1] = filename(with extension)
    console.log(`cd ${filePath[0]} && gcc ${filePath[1]}`)
    return new Promise((resolve, reject)=>{
        
        exec(`cd ${filePath[0]} && g++ ${'475896274902J3742C4025JH27343019.cpp'}`, (error, stdout, stderr)=>{
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
    execC,
};