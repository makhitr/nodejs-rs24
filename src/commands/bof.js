import path from "path";
import fsp from "fs/promises";
import fs from "fs";
import { existChecked, isFileChecked } from "../helper.mjs";

export const cat = async (dir, filePath) => {
  const file = path.resolve(dir, filePath);
  const fileExists = await existChecked(file);
  if (fileExists) {
    let isFile = await isFileChecked(file);
    if (isFile) {
      try {
        const data = await fsp.readFile(file, { encoding: "utf8" });
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    return;
  }
};

export const add = async (dir, fileName) => {
  try {
    const file = path.resolve(dir, fileName);
    await fsp.writeFile(file, "", { flag: "ax+" });
    console.log("File has been created");
  } catch (err) {
    console.error(err);
  }
};

export const rn = async (dir, ...args) => {
  const [oldFileName, newFileName] = args;
  const oldFile = path.resolve(dir, oldFileName);
  const newFile = path.resolve(dir, newFileName);
  const fileExists = await existChecked(oldFile);
  if (fileExists) {
    try {
      await fsp.rename(oldFile, newFile);
    } catch (err) {
      console.error("Operation failed");
    }
  }
};

export const cp = async (dir, ...args) => {
  const [pathToFile, pathToFolder] = args;
  const fileName = path.basename(pathToFile);

  const originalFile = path.resolve(dir, pathToFile);
  const destinationFolder = path.resolve(dir, pathToFolder);
  const copiedFile = path.resolve(destinationFolder, fileName);
  const fileExists = await existChecked(originalFile);

  const folderExists = await existChecked(destinationFolder);

  if (fileExists && folderExists) {
    try {
      const readable = fs.createReadStream(originalFile);
      const writable = fs.createWriteStream(copiedFile);
      readable.pipe(writable);
    } catch {
      console.error("Operation failed");
    }
  }
};

export const mv = async (dir, ...args) => {
  const [pathToFile, _] = args;
  const originalFile = path.resolve(dir, pathToFile);
  try {
    await cp(dir, ...args);
    await fsp.rm(originalFile, { recursive: true, force: true });
  } catch {
    console.log("Operation failed");
  }
};

export const rm = async (dir, filePath) => {
  const file = path.resolve(dir, filePath);
  const fileExists = await existChecked(file);
  if (fileExists) {
    try {
      await fsp.rm(file, { recursive: true, force: true });
    } catch (err) {
      console.error("Operation failed");
    }
  }
};
