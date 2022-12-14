url = "http://localhost:3000"
headers = {}
empleados = []


if (!localStorage.getItem("token")) {
    window.location.href = "../login/login.html"
}
else{
    local = localStorage.getItem("token")
    local = JSON.parse(local)

    sessionToken = local.token
    headers = {
        headers : {
            'Authorization': `bearer ${sessionToken}`,
        }
    }
}

agregarEmpleado = document.getElementsByClassName("btn-search")[0]

agregarEmpleado.addEventListener("click", ()=>{
    window.location.href = "../formulario/formulario.html" 
})

mostrarUsuarios()

function mostrarUsuarios(){
    axios.get(url + "/main", headers).then( 
        (response) => {
            if(response.data.code == 200){ 
                message = response.data.message 
                for(let i = 0; i< message.length; i++){  
                    resultados = document.getElementsByClassName("resultado")[0]
                    resultados.innerHTML += `<div class="empleado" id="${message[i].id}" onclick="detalles(${message[i].id})">
                                            ${message[i].Nombre} ${message[i].Apellido}
                                        </div>`
                    empleados.push(message[i])
                }
            }
            else{
                alert(response.data.message)
            }
        }
    ).catch(
        function (err){
        console.log(err)
        }
    )
}
function detalles(key){
    window.location.href = "../detalles/index.html?id="+key
}
  
buscador = document.getElementById("search")
buscador.addEventListener("input", buscarEmpleado)
function buscarEmpleado(){
    resultados = []
    empleados.forEach(element => {  
        nombreCompleto = element.Nombre + " " + element.Apellido
        if(
            element.Nombre.toUpperCase().includes(search.value.toUpperCase()) ||
            element.Apellido.toUpperCase().includes(search.value.toUpperCase()) ||  
            nombreCompleto.toUpperCase().includes(search.value.toUpperCase())
        ){
            resultados.push(element)
        }
    });
    mostrarBusqueda(resultados)
}


function mostrarBusqueda(filtrados){
    resultados = document.getElementsByClassName("resultado")[0]
    resultados.innerHTML = "";
    filtrados.forEach(element => { 
        resultados.innerHTML += `<div class="empleado" id="${element.id}" onclick="detalles(${element.id})">
                                    ${element.Nombre} ${element.Apellido}
                                </div>`
    });
}




logout = document.getElementById("logout");
logout.addEventListener("click", ()=>{
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
})