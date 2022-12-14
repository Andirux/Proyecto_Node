const express = require("express")
const app = express.Router();

const Main = require("../classes/main")
var main = new Main();

app.get("/", async (request, response, next) => {
    return main.obtenerTodosLosEmpleados(response)
})

app.delete("/:id([0-9]{1,3})", async (request, response, next) => {
    return main.borrarEmpleado(request, response)
})

app.post("/:id([0-9]{1,3})", async (request, response, next) => {
    return main.modificarEmpleado(request, response)
})

app.get("/:id([0-9]{1,3})", async (request, response, next) => {
    return main.obtenerEmpleado(request, response)  
})

app.post("/registro", async (request, response, next) =>{
    return main.crearEmpleado(request, response)
})



module.exports = app