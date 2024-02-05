const { createHash } = await import("node:crypto");
import path from "node:path";
import fs from "node:fs";

export const calculateHash = (dir, ...args) => {
  const hash = createHash("sha256");

  const [pathToFile, _] = args;
  const filePath = path.resolve(dir, pathToFile);
  const readStream = fs.createReadStream(filePath);
  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("end", () => {
    console.log(`Hash of file is ${hash.digest("hex")}`);
  });
};
