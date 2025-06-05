require("dotenv").config();

import app from "./app";
import { openClient, closeClient } from "./utils/database";

openClient().then(() => {
    console.log("Connection to database established");
    app.listen(process.env.PORT, () => {
        console.log(`Server is now listening on port ${process.env.PORT}`);
    });
});

process.on("SIGINT", async () => {
    await closeClient();
    console.log("Database connection closed");
    process.exit(0);
});
