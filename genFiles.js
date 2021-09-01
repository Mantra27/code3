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

const genFiles =(extension, code) =>{
    let id =FileNameGen();
    fs.writeFileSync(`${__dirname}/code/${id}.${extension}`, code);
    return id;
};

module.exports = {
    genFiles,
};
