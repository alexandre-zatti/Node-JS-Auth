require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
const register = require("./src/api/routes/auth/register");
const login = require("./src/api/routes/auth/login");
const logout = require("./src/api/routes/auth/logout");
const profile = require("./src/api/routes/profile");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/profile", profile);

app.get("/", (req, res) => {
    res.send("hello root");
  });

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Banco conectado com sucesso!');
    
    app.listen(port, err => {
      if (err) {
          return console.log("ERROR", err);
      }
      console.log(`Server iniciado na porta: ${port}!`);
      });
  })
  .catch((err) => {
    console.log(err);
  });


