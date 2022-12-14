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

editar = document.getElementById("editar")
volver = document.getElementById("volver")
borrar = document.getElementById("borrar")


Nombre = document.getElementsByName("first_name")[0]
Apellido = document.getElementsByName("last_name")[0]
Correo = document.getElementsByName("email")[0]
Direccion = document.getElementsByName("address")[0]
Telefono = document.getElementsByName("phone")[0]


editar.addEventListener("click", editarEmpleado)
volver.addEventListener("click", volverEmpleado)
borrar.addEventListener("click", borrarEmpleado)


function editarEmpleado(){
    if(Nombre && Apellido && Correo && Telefono && Direccion){
               
            axios.post(url + "/main/" + parametroPorURL("id"),{
                Nombre: Nombre.value,
                Apellido: Apellido.value,
                Correo: Correo.value,
                Telefono: Telefono.value,
                Direccion: Direccion.value, 
            }, headers).then(
                function (res) {
                    if(res.data.code == 200){
                        alert(res.data.message) 
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

function volverEmpleado(){
    window.location.href = "../busqueda/index.html"
}

function borrarEmpleado(){
    axios.delete(url + "/main/" + parametroPorURL("id"),headers).then(
        function (res) {
            if(res.data.code == 200){
                alert(res.data.message) 
                location.href="../busqueda/index.html"
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


loadUser()

function loadUser(){
    axios.get(url + "/main/" + parametroPorURL("id"), headers).then( 
        function (res){
            if(res.data.code == 200){ 
                message = res.data.message[0] 
                Nombre.value = message.Nombre
                Apellido.value = message.Apellido
                Correo.value = message.Correo
                Direccion.value = message.Direccion
                Telefono.value = message.Telefono
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

function parametroPorURL(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}