import generateFile from "../service/generateFileService.js";
import executeCpp from "../service/executeCppService.js";

const judgeHome = (req, res) => {
     res.send("Hello World");
};    

const judgeExecute = async (req, res) => {
      //will add multiple languages support later
       const {language = "cpp", code} = req.body;

       //if code is empty
       if(code === undefined){
        return res.status(400).json({success: false, message: "empty code body"});
       }
   
       //try executing the code
       try{
         const filePath = await generateFile(language, code);
         const output = await executeCpp(filePath);
         res.send({filePath, output});
       } catch(error){
           console.log(error);
           return res.status(500).json({success: false, message: error.message});
       }



};    

export { judgeHome, judgeExecute}