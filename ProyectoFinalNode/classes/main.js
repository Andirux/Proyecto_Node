
const db = require('../config/database')
const response = require("../middleware/responses")
class Main{
    constructor(){
        this.codigoHTML = 0
        this.mensaje = ""
    }
    async obtenerTodosLosEmpleados(res){
        const users = await db.query(`SELECT 
                                        id,
                                        Nombre,
                                        Apellido,
                                        Correo,
                                        Staff 
                                    FROM 
                                        users 
                                    WHERE 
                                        Status=1`)
        this.guardarRespuesta(200,users)
        return response(res, this.codigoHTML, this.mensaje)
    }
    guardarRespuesta(codigoHTML, mensaje){
        this.codigoHTML = codigoHTML
        this.mensaje = mensaje
    }
    async borrarEmpleado(request, res){
        const query = ` UPDATE 
                        users 
                    SET 
                        status=0 
                    WHERE 
                        id=${request.params.id}`;

        this.rows = await db.query(query);
        this.verificarEmpleadoBorrado()
        return response(res, this.codigoHTML, this.mensaje)
    }
    verificarEmpleadoBorrado(){
        if(this.huboCambios()){
            this.guardarRespuesta(200, "Usuario borrado correctamente")
        }
        else{
            this.guardarRespuesta(404, "Usuario no encontrado")
        }
    }
    huboCambios(){
        return this.rows.affectedRows == 1
    }
    async modificarEmpleado(request, res){
        const {Nombre, Apellido, Telefono, Correo, Direccion} = request.body;
        this.Nombre = Nombre
        this.Apellido = Apellido
        this.Telefono = Telefono
        this.Correo = Correo
        this.Direccion = Direccion
        if(this.camposCompletos()){
            let query =`UPDATE 
                            users 
                        SET Nombre='${this.Nombre}',
                            Apellido='${this.Apellido}', 
                            Telefono='${this.Telefono}',
                            Correo='${this.Correo}',
                            Direccion='${this.Direccion}' 
                        WHERE 
                            id=${request.params.id} AND
                            status=1`;
        
            this.rows = await db.query(query)
            
            this.verificarEmpleadoModificado()
        }
        else{
            this.guardarRespuesta(500, "Campos incompletos")
        }
        return response(res, this.codigoHTML, this.mensaje)
    }
    camposCompletos(){
        return this.Nombre && this.Apellido && this.Telefono && this.Correo && this.Direccion
    }
    verificarEmpleadoModificado(){
        if(this.huboCambios()){
            this.guardarRespuesta(200, "Usuario modificado correctamente")
        }
        else{
            this.guardarRespuesta(500, "Ocurrio un error con los campos")
        }
    }
    async obtenerEmpleado(request, res){
        const id = request.params.id;
        if (id) {
            var user = await db.query(`SELECT * FROM users where id=${id} AND status=1`);
            this.guardarRespuesta(200, user)
        }
        else{
            this.guardarRespuesta(404, "Usuario no encontrado")
        }
        return response(res, this.codigoHTML, this.mensaje)
    }
    async crearEmpleado(request, res){
        const {Nombre, Apellido, Telefono, Correo, Direccion} = request.body;
        this.Nombre = Nombre
        this.Apellido = Apellido
        this.Telefono = Telefono
        this.Correo = Correo
        this.Direccion = Direccion
        if(this.camposCompletos()){
            let query =`INSERT INTO 
                        users ( 
                            Nombre,
                            Apellido,
                            Telefono,
                            Correo,
                            Direccion)
                        VALUES (                        
                            '${this.Nombre}',
                            '${this.Apellido}', 
                            '${this.Telefono}',
                            '${this.Correo}',
                            '${this.Direccion}')`;
                            
            this.rows = await db.query(query)
            this.verificarEmpleadoCreado();
        }
        else{
            this.guardarRespuesta(500, "Campos incompletos")
        }
        return response(res, this.codigoHTML, this.mensaje)
    }
    verificarEmpleadoCreado(){
        if(this.huboCambios()){
            this.guardarRespuesta(200, "Usuario creado correctamente")
        }
        else{
            this.guardarRespuesta(500, "Ocurrio un error con los campos")
        }
    }
}

module.exports = Main