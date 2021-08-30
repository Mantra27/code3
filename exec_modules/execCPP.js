const {exec} = require('child_process');
const execCPP = (raasta) =>{
    const filePath = raasta.split(`^$#^`)
    //?   filePath[0] = path
    //?   filePath[1] = filename(with extension)
    console.log(`cd ${filePath[0]} && g++ ${filePath[1]} -o ${filePath[1].split('.')[0]}.exe && ${filePath[1].split('.')[0]}.exe`)
    return new Promise((resolve, reject)=>{
        exec(`cd ${filePath[0]} && g++ ${filePath[1]} -o ${filePath[1].split('.')[0]}.exe && ${filePath[1].split('.')[0]}.exe`, (error, stdout, stderr)=>{
            error && reject({error, stderr});
            stderr && reject(stderr);
            resolve(stdout);
        })
    })
    }
module.exports = {
    execCPP,
};