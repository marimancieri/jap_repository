let mail = "";

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
        mail = localStorage.getItem("email");
    }else{
        window.location.href=URL_INDEX;
    }
}

function borrarInfo(){
    localStorage.clear();
}

document.addEventListener("DOMContentLoaded", function (e) {
 usuarioLogeado();
 
 document.getElementById("mail").value = mail;
});