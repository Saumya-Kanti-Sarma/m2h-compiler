import fs from "fs";

export default function readFile(pathOfFile: string) {
  try {
    const data = fs.readFileSync(pathOfFile, "utf-8");
    return data
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    else console.error("Error while reading the file at src/utils/readFile.ts");
  }
  return null;
}