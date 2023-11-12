import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath) => {
  const jobId = path.baseline(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ $(filePath) -o $(outPath) && cd $(outputPath) && .\\${jobId}.exe`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          console.log(stderr);
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

export default executeCpp;
