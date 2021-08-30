const { DeclareFiles } = require("./DeclareFiles.js");
const { execJS } = require("./exec_modules/execJS.js");
const { execCPP } = require("./exec_modules/execCPP.js");
const { execPY } = require("./exec_modules/execPY.js");
const { execCH } = require("./exec_modules/execCH.js");
const { execC } = require("./exec_modules/execC.js");
const cors = require('cors')

const express = require("express");
const app = express();
const PORT = 6969;

app.use(cors())
app.listen(PORT, () => {
  console.log(`APP's Online! at port ${PORT}`);
});

app.get("/", (req, res) => {
  return res.json({ server: "running" });
});

app.post(`/run`, async (req, res) => {
  const { language = "default", code } = req.query;
  if (code === undefined || code == "" || code === null) {
    return res.status(400).json({ err: "empty code" });
  } else {
    try {
      const filePath = await DeclareFiles(language, code);

      let fileExtention = filePath.split(".")[1];
      console.log(fileExtention)
      if(fileExtention == 'js'){
        let output = await execJS(filePath);
        return res.json({ output });
      }
      else if(fileExtention == 'cpp'){
        let output = await execCPP(filePath);
        return res.json({ output });
      }
      else if(fileExtention == 'py'){
        let output = await execPY(filePath);
        return res.json({ output });
      }
      else if(fileExtention == 'ch'){
        let output = await execCH(filePath);
        return res.json({ output });
      }
      else if(fileExtention == 'c'){
        let output = await execC(filePath);
        return res.json({ output });
      }

      
      // return res.json({language, code})
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  }
});
