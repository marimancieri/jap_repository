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

function guardar(){
    let usuario = {};

    usuario.nombre = document.getElementById('userName').value;
    usuario.apellido = document.getElementById('userLastName').value;
    usuario.edad = document.getElementById('age').value;
    usuario.mail = document.getElementById('mail').value;
    usuario.telefono = document.getElementById('tel').value;
    // usuario.imagen = document.getElementById('foto').value;

    localStorage.setItem('user',JSON.stringify(usuario));

}

document.addEventListener("DOMContentLoaded", function (e) {
 usuarioLogeado();
 
 document.getElementById("mail").value = mail;
});