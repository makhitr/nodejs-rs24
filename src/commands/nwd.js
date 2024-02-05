import fsp from "node:fs/promises";
import path from "path";
import { existChecked, validateArguments } from "../helper.mjs";

export const up = (dir) => {
  return path.resolve(dir, "..");
};

export const cd = async (dir, ...args) => {
  try {
    const [newPath] = args;
    const file = path.resolve(dir, newPath);
    const fileExists = await existChecked(file);
    const resultPath = fileExists ? file : dir;
    return resultPath;
  } catch (err) {
    console.error("Operation failed");
    return dir
  }
};

export const ls = async (input) => {
  try {
    const files = await fsp.readdir(input, { withFileTypes: true });
    const result = files.sort().map((file) => {
      const type = file.isDirectory() ? "directory" : "file";
      return { Name: file.name, Type: type };
    });
    console.table(result);
  } catch (err) {
    console.error("Operation failed");
  }
};
