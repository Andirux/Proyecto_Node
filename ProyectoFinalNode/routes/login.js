const express = require("express")
const pagina = express.Router();
const Login = require("../classes/login")


pagina.post("/login", async (req, res, next) => {
    var login = new Login(req, res)
    return login.procesar()
})


module.exports = pagina