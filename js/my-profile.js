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

function mostrarImagen(){
    let preview = document.getElementById("imgUsuario2");
    let file = document.querySelector("input[type=file]").files[0]; 
    let reader = new FileReader();

    reader.onloadend = function () { 
        preview.src = reader.result; 
        document.getElementById("imgUsuario2").innerHTML = reader.result; 
    };

    if (file) {
        reader.readAsDataURL(file);
       
      } else {
        preview.src = "img/default-avatar.png";
      }

}

function mostrarDatos(){
    let usuario = JSON.parse(localStorage.getItem("user"));

    document.getElementById('userName').value = usuario.nombre; 
    document.getElementById('userLastName').value = usuario.apellido; 
    document.getElementById('age').value = usuario.edad; 
    document.getElementById('mail').value = mail;
    document.getElementById('tel').value = usuario.telefono;
    document.getElementById("imgUsuario2").src = usuario.imagen;
}
function guardar(){
    let usuario = {};

    usuario.nombre = document.getElementById('userName').value;
    usuario.apellido = document.getElementById('userLastName').value;
    usuario.edad = document.getElementById('age').value;
    usuario.mail = mail; //porque lo tengo guardado del login
    usuario.telefono = document.getElementById('tel').value;
    usuario.imagen = document.getElementById("imgUsuario2").src;

    localStorage.setItem('user',JSON.stringify(usuario));

}

document.addEventListener("DOMContentLoaded", function (e) {
 usuarioLogeado();
 
 
 document.getElementById("mail").value = mail;
 mostrarDatos();
 
});