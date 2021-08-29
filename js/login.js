
function guardarInfo(){
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('contraseña', document.getElementById('contraseña').value);
    mostrarNombre();
}

function borrarInfo(){
    localStorage.clear();
}

function mostrarNombre(){
    let email = localStorage.getItem("email");
    let i = email.indexOf('@');
    let nombre = email.slice(0,i);
    
    document.getElementById('info').innerHTML = nombre;
    localStorage.setItem('nombre', nombre);
}

document.addEventListener("DOMContentLoaded", function(e){
    mostrarNombre();
})