const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors=require('cors');
const authRoutes = require('./appBackend/Routes/authRoutes');
const buzzRoutes=require('./appBackend/Routes/buzzRoutes');
const complaintRoutes=require('./appBackend/Routes/complaintRoutes');
const adminRoutes=require('./appBackend/Routes/adminRoutes');
const auth = require("./appBackend/controller/authController");
const midware = require("./appBackend/midwares");
const dotenv=require('dotenv');
dotenv.config();

const app = express();
const port = 3030;
app.use(cors({
  origin:'*'
}
));

app.use(bodyParser.json());
app.use(authRoutes);
app.use(buzzRoutes);
app.use(complaintRoutes);
app.use(adminRoutes);
app.use('/Images',express.static('Images'));
app.use(auth.handleUnknownRequests);
app.use(midware.errorHandlingMiddleware);

const connection=process.env.DB_CONNECTION_STRING;
mongoose.connect(connection, {
  useNewUrlParser: "true",
  useFindAndModify:false,
  useUnifiedTopology:true
}).catch((error)=>{console.log(error)});

mongoose.connection.on("error", err => {
  console.log("err", err)
});

mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected")
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))