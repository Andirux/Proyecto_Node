url = "http://localhost:3000"
let headers = {}
if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html"
}
else{  
    local = localStorage.getItem("token")
    local = JSON.parse(local)
    sessionToken = local.token
    headers = {
        headers : {
            'Authorization': `bearer ${sessionToken}`
        }
    }
}

Aceptar = document.getElementById("Aceptar")
Cancelar = document.getElementById("Cancelar")


Aceptar.addEventListener("click", guardarEmpleado)
Cancelar.addEventListener("click", volver)

function guardarEmpleado(){
    Nombre = document.getElementsByName("first_name")[0].value
    Apellido = document.getElementsByName("last_name")[0].value
    Correo = document.getElementsByName("email")[0].value
    Direccion = document.getElementsByName("address")[0].value
    Telefono = document.getElementsByName("phone")[0].value


    if(Nombre && Apellido && Correo && Direccion && Telefono    ){

            axios.post(url + "/main/registro",{
                Nombre: Nombre,
                Apellido: Apellido,
                Correo: Correo,
                Telefono: Telefono,
                Direccion: Direccion, 
            }, headers).then(
                function (res) {
                    if(res.data.code == 200){
                        alert(res.data.message) 
                        window.location.href = "../busqueda/index.html"
                    }
                    else{
                        alert(res.data.message)
                    }
                }
            ).catch(
                function (err){
                    console.log(err)
                }
            )
            
    }
    else{
        alert("Campos incompletos")
    }
}

function volver(){
    window.location.href = "../busqueda/index.html"
}

