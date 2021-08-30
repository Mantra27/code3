const {exec} = require('child_process');
const execPY = (raasta) =>{
    const filePath = raasta.split(`^$#^`)
    //?   filePath[0] = path
    //?   filePath[1] = filename(with extension)
    console.log(`cd ${filePath[0]} && py ${filePath[1]}`)
    return new Promise((resolve, reject)=>{
        exec(`cd ${filePath[0]} && py ${filePath[1]}`, (error, stdout, stderr)=>{
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
    execPY,
};