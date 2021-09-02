const {exec} = require('child_process');
const execPY = (input) =>{
    console.log(`cd code && python ${input}.py`)
    return new Promise((resolve, reject)=>{
         exec(`cd code && python ${input}.py`, (error, stdout, stderr)=>{
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
