const {exec} = require('child_process');
const execCPP = (input) =>{
    console.log(`cd code && g++ ${input} -o ${input}.exe && ${input}.exe`)
    return new Promise((resolve, reject)=>{
         exec(`cd code && g++ ${input}.cpp -o ${input}.exe && ./${input}.exe`, (error, stdout, stderr)=>{
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
