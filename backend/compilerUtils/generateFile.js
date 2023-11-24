import fs from "fs"; // to create file
import path, {dirname} from "path"; // to get the current directory path
import { fileURLToPath } from 'url';
import { v4 as uuid } from "uuid"; // to generate unique file name

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirCodes = path.join(__dirname, "./codes"); //directory where all codes will be stored
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
  //language directory
  let langDir;
  if (language === "cpp") langDir = path.join(__dirname, "./codes/cpp");
  else if (language === "java") langDir = path.join(__dirname, "./codes/java");
  else if (language === "py") langDir = path.join(__dirname, "./codes/py");

  //create language directory if not exists
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  let modifiedCode = code;
  let codeId = uuid().replace(/-/g, ""); //remove all hyphens from uuid
  if (lang === "java") {
    codeId = "MyClass_" + codeId;
    const classNameRegex = /public\s+class\s+(\w+)\s*\{/;
    modifiedCode = code.replace(classNameRegex, `public class ${codeId}{`);
  }

  const fileName = `${codeId}.${language}`;
  const filePath = path.join(langDir, fileName);

  await fs.writeFileSync(filePath, modifiedCode);
  return filePath;
};
export default generateFile;
