const express = require('express')
const morgan = require('morgan')

class App{
    constructor(){
        this.#importarRutas();
        this.#importarMiddleware();
        this.app = express()
    }

    #importarRutas() {
        this.empleados = require("../routes/main")
        this.login = require("../routes/login")
    }

    #importarMiddleware() {
        this.auth = require("../middleware/auth")
        this.notFound = require("../middleware/notFound")
        this.index = require("../middleware/index")
        this.cors = require("../middleware/cors")
    }

    configurarServidor(){
        this.app.use(this.cors)
        this.app.use(morgan('dev'))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    crearRutas(){
        this.app.get("/", this.index)
        this.app.use("/login", this.login)
        this.app.use(this.auth)
        this.app.use("/main", this.empleados)
        this.app.use(this.notFound)
    }

    iniciarServidor(){
        this.app.listen(process.env.PORT || 3000, () => {
            console.log("server is running")
        })
    }

}

module.exports = App