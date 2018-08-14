import config from "config";

import "./db";

import app from "./middleware";

const port = config.get("PORT");

app.listen(port, () => console.log(`Listening on port ${port}`));
