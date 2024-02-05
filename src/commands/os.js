import os from "os";

export const oSystem = (args) => {
  switch (args) {
    case "--EOL": {
      console.log("EOL:", JSON.stringify(os.EOL));
      break;
    }

    case "--cpus": {
      const cpus = os.cpus();
      console.table(cpus);
      break;
    }

    case "--homedir": {
      console.log("homedir:", os.homedir());
      break;
    }

    case "--username": {
      console.log("username:", os.userInfo().username);
      break;
    }

    case "--architecture": {
      console.log("architecture:", os.arch());
      break;
    }

    default:
      console.log("Invalid input");
      break;
  }
};
