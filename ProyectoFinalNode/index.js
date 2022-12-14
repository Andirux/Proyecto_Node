const App = require("./classes/aplicacion")

var app = new App()

app.configurarServidor()
app.crearRutas()
app.iniciarServidor()
