const {exec} = require('child_process');
const execJS = (input) =>{
    console.log(`cd code && node ${input}`)
    return new Promise((resolve, reject)=>{
        exec(`cd code && node ${input}.js`, (error, stdout, stderr)=>{
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
    execJS,
};
