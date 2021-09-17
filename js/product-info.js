//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function(e){

// });
var category = {};
comentarios = [];

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
    if (score==1){
        starsTo = ` <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`
    }else if (score==2){
        starsTo = ` <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`
    }else if (score==3){
        starsTo = ` <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`
    }else if (score==4){
        starsTo = ` <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>`
    }else if(score==5){
        starsTo = ` <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>`
    }else{
        starsTo = ` <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`
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
                        <div>
                            <p id="com-user">` + comentario.user + `</p>
                            <div id="com-score">` + stars(comentario.score) + `</div>
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

    let nuevoComent = {};
    nuevoComent.user = localStorage.getItem("nombre");
    nuevoComent.description = document.getElementById("nuevoComentario").value;
    nuevoComent.score = document.getElementById("puntaje").value;
    
    console.log(nuevoComent);

    // comentarios.push(nuevoComent);
    // showComents(comentarios);
   

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