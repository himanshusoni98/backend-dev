import dotenv from "dotenv";
import app from "./app.js";
import ConnectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 8000;

ConnectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("Connection error:", err);
    });
