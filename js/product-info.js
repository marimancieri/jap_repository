
var category = {};
var comentarios = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (i==0){
            htmlContentToAppend += `
            <div class="carousel-item active">
                <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            </div>
            `
            
        }else{
        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>`
        }

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
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <p id="mb1" style="font-weight: bold">` + comentario.user + `</p>
                            <p>` + stars(comentario.score)  + `</p>
                            
                            
                        </div>
                        <div id="com-description">` + comentario.description + `</div>
                        <div id="com-dateTime">` + comentario.dateTime + `</div>
                        

                    </div>
                </div>
            </div>`    
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }

}

function addComent(){
    
    const fecha = new(Date);
    let nuevaFecha = fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds(); 

    let nuevoComent = {};

    nuevoComent.user = localStorage.getItem("nombre");
    nuevoComent.description = document.getElementById("nuevoComentario").value;
    nuevoComent.score = document.getElementById("puntaje").value;
    nuevoComent.dateTime = nuevaFecha;
 
    comentarios.push(nuevoComent);
    showComents(comentarios);

    document.getElementById("nuevoComentario").value=""; //vacia text area
    document.getElementById("puntaje").value=1;  //resete puntuación
}

function ShowProductosRelacionados(arrayProductos){
    let ProdRelacToAppend = "";

    for (let i=0; i < product.relatedProducts.length; i++){
        let prodRelac = arrayProductos[product.relatedProducts[i]];

        ProdRelacToAppend +=`
        

        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="` + prodRelac.imgSrc + `" alt="Card image">
            <div class="card-body">
                <h5 class="card-title">`+ prodRelac.name +`</h5>
                <p class="card-text">` + prodRelac.currency +` `+ prodRelac.cost +`</p>
                <a href="product-info.html" class="btn btn-dark">Ver</a>
            </div>
        </div>
        `
        //el link va a llevar a la misma pag xq hay solo info de un porducto. 

        
        document.getElementById("ProductosRelacionados").innerHTML = ProdRelacToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObjProd){
        if (resultObjProd.status === "ok")
        {
            arrayProduct = resultObjProd.data;
            
        }
    });
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

            // let arrayRelatedProducts = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            //Muestro porductos relacionados
            ShowProductosRelacionados(arrayProduct);
           
  
        }
    });
    
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObjComent){
        if (resultObjComent.status === "ok")
        {
            comentarios = resultObjComent.data;

            showComents(comentarios);
        }
    });
    
    

    
});