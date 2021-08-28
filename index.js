const express = require('express');
const {DeclareFiles} = require('./DeclareFiles.js')
const {execCPP} = require('./execCPP.js')
const {execJS} = require('./execJS.js')
//generateFile(extension, code)
const app = express();
const PORT = 6969;

app.listen(PORT, ()=>{
    console.log(`APP's Online! at port ${PORT}`)
})

app.get('/', (req, res)=>{
    return res.json({hello: 'world'});
});

app.post(`/run`, async (req, res)=>{
    const {language = 'default', code} = req.query;
    if(code === undefined || code == "" || code === null){
        return res.status(400).json({err: 'empty code'})
    }
    
    else{
        try{
        const filePath = await DeclareFiles(language, code)
        // const output = await execCPP(filePath)
        const output = await execJS(filePath)

        return res.json({output});
        // return res.json({language, code})
        }
        catch(err){
            res.status(500).json({err});
            console.log(err)
        }
    }
})