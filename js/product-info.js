//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function(e){

// });
var category = {};
var comentarios = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function stars(score){
    let starsTo = "";
    for(let i = 1; i<=5; i++){
        if(i<=score){
            starsTo += ` <span class="fa fa-star checked"></span>`
        }
        else{
            starsTo += ` <span class="far fa-star"></span>`
        }
    }
    return starsTo;
}

function showComents(comentArray){
    let htmlContentToAppend = "";

    for(let i = 0; i < comentArray.length; i++){
        let comentario = comentArray[i];

        htmlContentToAppend += `
                <div>
                    <div class="show-comentario">
                        <div id="com-user-score">
                            <p id="com-user">` + comentario.user + stars(comentario.score)  + `</p>
                            
                        </div>
                        <div id="com-description">` + comentario.description + `</div>
                        <div id="com-dateTime">` + comentario.dateTime + `</div>
                        

                    </div>
                </div>
                `    
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }

}

function addComent(){
    console.log("comentarios" + comentarios)
    const fecha = new(Date);
    const options = {year: "numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:"false"};
    let nuevaFecha = Intl.DateTimeFormat('en-CA',options).format(fecha);

    let nuevoComent = {};
    nuevoComent.user = localStorage.getItem("nombre");
    nuevoComent.description = document.getElementById("nuevoComentario").value;
    nuevoComent.score = document.getElementById("puntaje").value;
    nuevoComent.dateTime = nuevaFecha;
 
    console.log(nuevoComent);
    comentarios.push(nuevoComent);
    console.log("comentarios.push" + comentarios);
    showComents(comentarios);

    document.getElementById("nuevoComentario").value=""; //vacia text area
    document.getElementById("puntaje").value=1; 
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
  
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentarios = resultObj.data;

            showComents(comentarios);
        }
    });

    // document.getElementById("enviarComentario").addEventListener("click", function(){
    //     addComent();
    // });
});