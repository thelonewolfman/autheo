import mongoose, { ConnectionOptions } from "mongoose";
import config from "config";

const options: ConnectionOptions = {
  config: {
    autoIndex: config.get("AUTOINDEX")
  },
  useNewUrlParser: true
};

mongoose
  .connect(
    `${config.get("DB_HOST")}:${config.get("DB_PORT")}/${config.get(
      "DB_NAME"
    )}`,
    options
  )
  .catch((err: any) => {
    console.error(err.message);
    process.exit(1);
  });
