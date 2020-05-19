const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors=require('cors');
const routes = require('./appBackend/routes');
const dotenv=require('dotenv');

dotenv.config();

const app = express();
const port = 3030;
app.use(cors({
  origin:'*'
}
));

app.use(bodyParser.json());
app.use(routes);
const connection=process.env.DB_CONNECTION_STRING;
mongoose.connect(connection, {
  useNewUrlParser: "true",
  useFindAndModify:false
}).catch((error)=>{console.log(error)});

mongoose.connection.on("error", err => {
  console.log("err", err)
});

mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected")
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))