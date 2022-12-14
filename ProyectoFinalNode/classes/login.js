const jwt = require('jsonwebtoken')
const db = require('../config/database')
const response = require("../middleware/responses")

class Login{
    constructor(request, response){
        this.request = request
        this.response = response    

        var {correo, password} = this.request.body;
        this.correo = correo;
        this.password = password

        this.codigoHTML = 0
        this.mensaje = ""
    }
    async procesar(){
        await this.comprobarCredenciales()
        
        if(this.huboResultados()){

            const {id, Nombre, Staff} = this.rows[0]
            this.id = id
            this.Nombre = Nombre
            this.Staff = Staff

            if(this.elUsuarioTienePrivilegios()){
                this.crearToken()
                this.codigoHTML = 200
                this.mensaje = this.token
            }
        }
        return response(this.response, this.codigoHTML, this.mensaje)
    }
    async comprobarCredenciales(){
        if(this.correo && this.password){
            this.crearQuery()
            this.rows = await db.query(this.query)
        }
        else{
            this.rows = []
            this.codigoHTML = 500
            this.mensaje = "Campos incompletos"
        }
    }
    crearQuery(){
        this.query = ` SELECT 
                            * 
                        FROM 
                            users 
                        WHERE 
                            correo = '${this.correo}' AND 
                            password = '${this.password}'`
    }
    huboResultados(){
        if(this.rows.length == 1){
            return true
        }
        else{
            this.codigoHTML = 400
            this.mensaje = "Usuario y/o contraseña incorrectos"
            return false
        }
    }
    elUsuarioTienePrivilegios(){
        if(this.Staff==1){
            return true
        }
        else{
            this.codigoHTML = 400
            this.mensaje = "No tienes permisos de administrador"
            return false
        }
    }
    crearToken(){
        this.token = {
            user:{
                id: this.id,
                Nombre: this.Nombre
            },
            token: jwt.sign({
                        user_id: this.rows[0].user_id,
                        user_mail: this.rows[0].user_mail, 
                    }, "aa31ab423339324dc962bb14488b4d06")
        }  
    }
}

module.exports = Login