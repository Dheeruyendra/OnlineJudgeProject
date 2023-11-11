import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {exec} from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = (filePath) => {
      

}

export default executeCpp;