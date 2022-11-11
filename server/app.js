const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express();
const authRoutes = require("./routes/auth");
const personRoutes = require("./routes/personData");
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(bodyParser.json());


app.use(authRoutes);
app.use(personRoutes);
app.use((error,req,res,next) => {
  console.log('erroerrorerrorr',error);
   res.status(404).json({errors: error});
})

mongoose.connect("mongodb+srv://sbs:sbsmaster@cluster0.tc7ok6w.mongodb.net/service?retryWrites=true&w=majority")
.then(() => {
    app.listen(8080);
})
