const express = require('express');
const app = express();
const PORT = 6969;
const {genFiles} = require('./genFiles.js');
const {execCPP} = require('./exec_modules/execCPP.js');
const {execJS} = require('./exec_modules/execJS.js')
const {execCH} = require('./exec_modules/execCH.js')
const {execPY} = require('./exec_modules/execPY.js')
const {execC} = require('./exec_modules/execC.js')
const cors = require('cors');
const detectLang = require('lang-detector');
app.listen(PORT, ()=>{
    console.log(`server online at port: ${PORT}`)
});

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/", (req, res)=>{
return res.json({goodbye: 'world'})
})

app.post('/run', async (req, res)=>{

     console.log(req.body)
    const [language, code] = [req.body.language, req.body.code];
    if(code === undefined){
        return res.json({err: "empty code module"})
    }
    if(code === ''){
        return res.json({err: "empty code module"})
    }
    if(code.trim() === ''){
        return res.json({err: "empty code module"})
    }
    if(language=='js' && detectLang(code)!=='JavaScript'){
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        return res.json({tip: "make sure your language and code are the same", detectedLanguage: 'js'})
    }
    if(language=='cpp' && detectLang(code)!=='C++'){
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        return res.json({tip: "make sure your language and code are the same", detectedLanguage: 'cpp'})
    }
    if(language=='py' && detectLang(code)!=='Python'){
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        return res.json({tip: "make sure your language and code are the same", detectedLanguage: 'py'})
    }
    if(language=='c' && detectLang(code)!=='C'){
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        return res.json({tip: "make sure your language and code are the same", detectedLanguage: 'c'})
    }
    try{
        let File = genFiles(language, code)
        console.log(File)
        if(language == 'js'){
            let output = await execJS(File)
            console.log(output)
            return res.json({output})
        }
        if(language == 'cpp'){
            let output = await execCPP(File)
            console.log(output)
            return res.json({output})
        }
        if(language == 'cs'){
            let output = await execCH(File)
            console.log(output)
            return res.json({output})
        }
        
        if(language == 'py'){
            let output = await execPY(File)

            return res.json({output})
        }
        
        if(language == 'c'){
            let output = await execC(File)
            console.log(output)
            return res.json({output})
        }
        
        
        

    }
    catch(err){
        res.status(500).json({err})
    }

})
