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
        return res.json({tip: "Make sure your language and code are matching", detectedLanguage: detectLang(code)})
    }
    if(language=='cpp' && detectLang(code)!=='C++'){
        return res.json({tip: "Make sure your language and code are matching", detectedLanguage: detectLang(code)})
    }
    if(language=='py' && detectLang(code)!=='Python'){
        return res.json({tip: "Make sure your language and code are matching", detectedLanguage: detectLang(code)})
    }
    if(language=='c' && detectLang(code)!=='C'){
        return res.json({tip: "Make sure your language and code are matching", detectedLanguage: detectLang(code)})
    }
    try{
        let File = genFiles(language, code)
        console.log(File)
        if(language == 'js'){
            let output = await execJS(File)
            console.log(output)
            return res.json({output: output, name: `${File}.js`})
        }
        if(language == 'cpp'){
            let output = await execCPP(File)
            console.log(output)
            return res.json({output: output, name: `${File}.cpp`})
        }
        if(language == 'cs'){
            let output = await execCH(File)
            console.log(output)
            return res.json({output: output, name: `${File}.cs`})
        }
        
        if(language == 'py'){
            let output = await execPY(File)
            console.log(output)
            return res.json({output: output, name: `${File}.py`})
        }
        
        if(language == 'c'){
            let output = await execC(File)
            console.log(output)
            return res.json({output: output, name: `${File}.c`})
        }
        
        
        

    }
    catch(err){
        res.status(500).json({err})
    }

})
