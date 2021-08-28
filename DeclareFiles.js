const code_module_path = __dirname + `/code_modules`;
const fs = require('fs');

const FileNameGen = ()=>{
    let namearr = [];
    for(let i=0; i<=10; i++){
        let rand = Math.floor(Math.random()*1000)
        if(rand%2){
        namearr[i] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[Math.floor(Math.random()*26)];
            }

        else{
        namearr[i] = Math.floor(Math.random()*10000)
            }
}
return namearr.join('');

}
let id = FileNameGen();
const DeclareFiles = async (extension, code) =>{
    await fs.writeFileSync(`${code_module_path}/${id}.${extension}`, code);
    return `${code_module_path}^$#^${id}.${extension}`
};

module.exports = {
    DeclareFiles,
};