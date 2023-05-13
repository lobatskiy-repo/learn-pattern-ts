import fs from "fs";
import path from "path";
import * as url from "url";
import { csvParse } from "d3-dsv"; 

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
 
const processData = (fileData: any[]) => console.dir(fileData);

const content = fs.readFileSync(path.join(__dirname, "users.csv"), "utf8");

const fileData = csvParse(content);
 
processData(fileData);