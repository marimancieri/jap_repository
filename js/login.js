
URL_HOME = "home.html";

//se llama al hacer click en boton enviar del index.html
function guardarInfo(){  
    localStorage.setItem('email', document.getElementById('email').value);
    mostrarNombre();
}


document.addEventListener("DOMContentLoaded", function(e){
    if (localStorage.getItem("email")!= null){ //si hay un usuario logeado me lleva al home
        window.location.href=URL_HOME;
    }
})