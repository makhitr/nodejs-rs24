import fsp from "node:fs/promises";
import fs from "node:fs";
import path from "node:path"; 

export const COMMANDS = {
  UP: "up",
  CD: "cd",
  LS: "ls",
  CAT: "cat",
  ADD: "add",
  RN: "rn",
  CP: "cp",
  MV: "mv",
  RM: "rm",
  OS: "os",
  HASH: "hash",
  COMPRESS: "compress",
  DECOMPRESS: "decompress",
  EXIT: ".exit",
};

export const validateArguments = (command, ...args) => {
  switch (command) {
    case COMMANDS.UP:
    case COMMANDS.LS:
    case COMMANDS.EXIT: {
      if (args.length === 0) {
        return true;
      } else {
        console.log("The number of arguments is incorrect.\n Operation failed");
        return false;
      }
    }
    case COMMANDS.CD:
    case COMMANDS.HASH:
    case COMMANDS.CAT:
    case COMMANDS.RM:
    case COMMANDS.ADD:
    case COMMANDS.OS: {
      if (args.length === 1 && args?.every((el) => typeof el === "string")) {
        return true;
      } else {
        console.log("The number of arguments is incorrect or argument is not a string.\n Operation failed");
        return false;
      }
    }
    case COMMANDS.RN:
    case COMMANDS.CP:
    case COMMANDS.MV:
    case COMMANDS.COMPRESS:
    case COMMANDS.DECOMPRESS: {
      if (args.length === 2 && args?.every((el) => typeof el === "string")) {
        return true;
      } else {
        console.log("The number of arguments is incorrect or argument is not a string.\n Operation failed");
        return false;
      }
    }
  }
};

export const existChecked = async (file) => {
  try {
    await fsp.access(file, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch {
    console.error("There is no such directory or file.\n Operation failed");
    return false;
  }
};

export const isFileChecked = async (path) => {
  const stats = await fsp.stat(path);
  if (!stats.isFile(path)) {
    console.log("It is not a file.\n Operation failed");
  } else return true;
};
