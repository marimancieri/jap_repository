//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function (e) {

// });

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_PRICE = "Price";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array){// devuelve el array ordenado segun criterio indicado
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;   
        });
    }

    return result; // devuelve el array ordenado segun criterio indicado
}

function showPoductsList(){ //insterta lista de productos en html

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.currency +` `+ product.cost +` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; //traigo el id de products.html
    }
} 

function sortAndShowProd(sortCriteria, productsArray){ //une dos func. anteriores
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    //ordeno productos
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro productos ordenadas
    showPoductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){ //URL
        if (resultObj.status === "ok"){
            sortAndShowProd(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProd(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProd(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByPrice").addEventListener("click", function(){
        sortAndShowProd(ORDER_BY_PROD_PRICE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showPoductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showPoductsList();
    });
});