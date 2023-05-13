import fs from "fs";
import path from "path";
import * as url from "url";
import { marked } from "marked";

import { csvParse } from "d3-dsv";

abstract class FileParser {
  // Шаблонный метод
  parse(filePath: string) {
    const content: any = this.readFile(filePath);

    const fileData = this.parseFile(content);

    this.processData(fileData);
  }

  readFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
  }

  abstract parseFile(fileContent: string): any;

  processData(fileData: any[]) {
    console.log(fileData);
  }
}

class CsvParser extends FileParser {
  parseFile(fileContent: string) {
    return csvParse(fileContent);
  }
}

class MarkdownParse extends FileParser {
  parseFile(fileContent: string) {
    return marked.parse(fileContent);
  }
}

const csvParser = new CsvParser();
const mdParser = new MarkdownParse();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

csvParser.parse(path.join(__dirname, "users.csv"));
mdParser.parse(path.join(__dirname, "Users.md"));
