import executeCode from "../compilerUtils/executeCode.js";
import generateFile from "../compilerUtils/generateFile.js";

const run = async (req, res) => {
  const { lang, code, input, type } = req.body;
  if (!code) return res.status(400).json({ message: "Please provide code" });

  try {
    //generate file
    const filePath = await generateFile(lang, code);
    //execute code file
    const output = await executeCode(filePath, lang, input, type);

    return res.status(200).json({ filePath, output });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export default run;
