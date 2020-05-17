const express = require('express');
// const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors=require('cors');
const routes = require('./homepage/routes');

const app = express();
const port = 3030;
app.use(cors({
  origin:'*'
}
));


app.use(bodyParser.json());
app.use(routes);
// mongoose.connect("mongodb://localhost:27017/ttnd-buzz", {
//   useNewUrlParser: "true",
//   useFindAndModify:false
// });

// mongoose.connection.on("error", err => {
//   console.log("err", err)
// });

// mongoose.connection.on("connected", (err, res) => {
//   console.log("Mongoose is connected")
// });

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))