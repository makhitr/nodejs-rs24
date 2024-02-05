import readline from "node:readline/promises";
import os from "node:os";
import { nwd, bof, oss, zip, appHash } from "./commands/index.js";
import { COMMANDS, validateArguments } from "./helper.mjs";

export class App {
  constructor() {
    const appArgs = process.argv.slice(2);
    this.userName = !appArgs.length ? "Anonymous" : appArgs[0].slice(appArgs[0].indexOf("=") + 1);
    this.dir = os.homedir();
    this.currentDir = this.dir;
  }

  showDir() {
    console.log(`You are currently in ${this.currentDir}`);
  }

  greeting() {
    console.log(`Welcome to the File Manager, ${this.userName}!`);
  }

  exitMessage() {
    console.log(`Thank you for using File Manager,  ${this.userName}, goodbye!`);
  }

  makeReadline() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.prompt();

    rl.on("line", async (line) => {
      const [command, ...args] = line.split(" ");
      switch (command) {
        case COMMANDS.UP: {
          const validatedArgs = validateArguments(COMMANDS.UP, ...args);
          if (validatedArgs) {
            this.currentDir = nwd.up(this.currentDir);
            this.showDir();
          }
          break;
        }
        case COMMANDS.CD: {
          const validatedArgs = validateArguments(COMMANDS.CD, ...args);
          if (validatedArgs) {
            this.currentDir = await nwd.cd(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.LS: {
          const validatedArgs = validateArguments(COMMANDS.LS, ...args);
          if (validatedArgs) {
            await nwd.ls(this.currentDir);
            this.showDir();
          }
          break;
        }
        case COMMANDS.CAT: {
          const validatedArgs = validateArguments(COMMANDS.CAT, ...args);
          if (validatedArgs) {
            await bof.cat(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.ADD: {
          const validatedArgs = validateArguments(COMMANDS.ADD, ...args);
          if (validatedArgs) {
            await bof.add(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.RN: {
          const validatedArgs = validateArguments(COMMANDS.RN, ...args);
          if (validatedArgs) {
            await bof.rn(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.CP: {
          const validatedArgs = validateArguments(COMMANDS.CP, ...args);
          if (validatedArgs) {
            await bof.cp(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.MV: {
          const validatedArgs = validateArguments(COMMANDS.MV, ...args);
          if (validatedArgs) {
            await bof.mv(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.RM: {
          const validatedArgs = validateArguments(COMMANDS.RM, ...args);
          if (validatedArgs) {
            await bof.rm(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.OS: {
          const validatedArgs = validateArguments(COMMANDS.OS, ...args);
          if (validatedArgs) {
            oss.oSystem(...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.HASH: {
          const validatedArgs = validateArguments(COMMANDS.HASH, ...args);
          if (validatedArgs) {
            appHash.calculateHash(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.COMPRESS: {
          const validatedArgs = validateArguments(COMMANDS.COMPRESS, ...args);
          if (validatedArgs) {
            await zip.compress(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.DECOMPRESS: {
          const validatedArgs = validateArguments(COMMANDS.DECOMPRESS, ...args);
          if (validatedArgs) {
            await zip.decompress(this.currentDir, ...args);
            this.showDir();
          }
          break;
        }
        case COMMANDS.EXIT: {
          const validatedArgs = validateArguments(COMMANDS.EXIT, ...args);
          if (validatedArgs) {
            rl.close();
            this.exitMessage();
          }
          break;
        }
        default:
          console.log("Invalid input");
          break;
      }
    });
    rl.on("close", () => {
      this.exitMessage();
      process.exit(0);
    });
  }

  start() {
    this.greeting();
    this.showDir();
    this.makeReadline();
  }
}
