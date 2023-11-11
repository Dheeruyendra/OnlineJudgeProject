import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCode = path.join(__dirname, "codes");
if (!fs.existsSync(dirCode)) {
  fs.mkdirSync(dirCode, { recursive: true });
}

const generateFile = async (language, code) => {
  //create file with unique name
  const jobId = uuid();
  console.log(jobId);
  const fileName = `${jobId}.${language}`;
  const filePath = path.join(dirCode, fileName);

  //write code to file
  await fs.writeFileSync(filePath, code);
  return filePath;
};

export default generateFile;
