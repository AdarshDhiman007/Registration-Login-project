import express from "express";
import router from "./routes/web.js";
import {join} from 'path'
import connectDB from "./db/connectdb.js";

const app = express();
const port = process.env.PORT || "3000";
const db = process.env.db || 'mongodb://localhost:27017'

app.use(express.static(join(process.cwd(), 'public')))
app.use(express.urlencoded({extended: true}))

app.set('view engine','ejs')
connectDB(db)

app.use('/',router)

app.listen(port, () => {
  console.log(`Server is ${port}`);
});
