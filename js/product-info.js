//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function(e){

// });
var category = {};

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

function showComents(comentArray){
    let htmlContentToAppend = "";

    for(let i = 0; i < comentArray.length; i++){
        let comentario = comentArray[i];

        htmlContentToAppend += `
                <div>
                    <div class="show-comentario">
                        <div>
                            <p id="com-user">` + comentario.user + `</p>
                            <p id="com-score">` + comentario.score + `</p>
                        </div>
                        <div id="com-description">` + comentario.description + `</div>
                        <div id="com-dateTime">` + comentario.dateTime + `</div>
                        

                    </div>
                </div>
                `    


        // htmlContentToAppend += `
        //         <div class="row">
        //             <div class="col">
        //                 <dt>` + comentario.user + `</dt>
        //                 <dd>
        //                 <p>` + comentario.description + `</p>
        //                 <p>` + comentario.dateTime + `</p>
        //                 <p>` + comentario.score + `</p>

        //                 </dd>
        //             </div>
        //         </div>
        //         `

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }

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
});