//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function mostrarNombre(){
    let email = localStorage.getItem("email");
    let i = email.indexOf('@');
    let nombre = email.slice(0,i);
    
    document.getElementById('info').innerHTML = nombre;
    localStorage.setItem('nombre', nombre);
}

function usuarioLogeado(){
    var URL_INDEX = "index.html";
    if (localStorage.getItem("email")!= null){
        mostrarNombre();
    }else{
        window.location.href=URL_INDEX;
    }
}

function borrarInfo(){
    localStorage.clear();
}

document.addEventListener("DOMContentLoaded", function (e) {
 usuarioLogeado();
});