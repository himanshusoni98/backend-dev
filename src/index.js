import dotenv from "dotenv";
import ConnectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

ConnectDB();
.then(() => {
    app.listen(process.env.PORT , ()=>{
        console.log(`server is running this port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("connection error failed", err)
});