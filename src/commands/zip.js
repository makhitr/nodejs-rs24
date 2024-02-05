import zlib from "zlib";
import path from "path";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { existChecked } from "../helper.mjs";

export const compress = async (dir, ...args) => {
  const [pathToFile, pathToDestination] = args;
  const originalFile = path.resolve(dir, pathToFile);
  const zippedFile = path.resolve(dir, pathToDestination);
  const fileName = path.basename(pathToFile);
  const brot = zlib.createBrotliCompress();
  const source = createReadStream(originalFile);
  const destination = createWriteStream(`${zippedFile}/${fileName}.gz`);
  const fileExists = await existChecked(originalFile);
  if (fileExists) {
    pipeline(source, brot, destination, (err) => {
      if (err) {
        console.error("Operation failed");
      }
    });
  }
};

export const decompress = async (dir, ...args) => {
  const [pathToFile, pathToDestination] = args;
  const originalFile = path.resolve(dir, pathToFile);
  const unzippedFile = path.resolve(dir, pathToDestination);

  const brot = zlib.createBrotliDecompress();
  const source = createReadStream(originalFile);
  const destination = createWriteStream(unzippedFile);
  const fileExists = await existChecked(originalFile);
  

  if (fileExists) {
    pipeline(source, brot, destination, (err) => {
      if (err) {
        console.error("Operation failed");
      }
    });
  }
};
