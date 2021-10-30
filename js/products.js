
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DES_BY_PRICE = "ZA";
const ORDER_BY_RELEVANCE = "Relevance"; //orden decreciente
const ORDER_BY_FILTER = "Filter";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
var searchArray = [];

function sortProducts(criteria, array){// devuelve el array ordenado segun criterio indicado
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice < bPrice ){ return -1; }
            if ( aPrice > bPrice ){ return 1; }
            return 0;   
        });
    }else if (criteria === ORDER_DES_BY_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;   
        });
    }else if (criteria === ORDER_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.soldCount);
            let bPrice = parseInt(b.soldCount);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;   
        }); 
    }

    return result; // devuelve el array ordenado segun criterio indicado
}

function showPoductsList(arrayToShow){ //insterta lista de productos en html
    if(arrayToShow == undefined){
        arrayToShow = currentProductsArray;
    }

    let htmlContentToAppend = "";
    if(arrayToShow.length != 0){
        for(let i = 0; i < arrayToShow.length; i++){
            let product = arrayToShow[i];

            if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
                ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

                htmlContentToAppend += `
                <div class="col-md-4 col-lg-3">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                        <div class="col-sm" style="width: 18rem;">
                            <img class="card-img-top" src="` + product.imgSrc + `" alt="`+ product.description + `">
                            <div class="card-body">
                                <h5 class="card-title">`+ product.name +`</h5>
                                <small class="text-muted">` + product.description +` </small>
                                <p class="card-text">` + product.currency +` `+ product.cost +`</p>
                                <small class="text-muted"> Vendidos: ` + product.soldCount +` </small>
                                
                            </div>
                        </div>
                    </a>
                </div>
                `
            }
        }
    }
    else{
        htmlContentToAppend += `
        <div class="row">
            <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1"> No se encontraron porductos </h5>
            </div>
        </div>
    `
    }

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; //traigo el id de products.html
    
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

function buscar(){
    var input = document.getElementById("buscador").value;
    var filtro = input.toUpperCase();
    //console.log("filtro="+filtro);
    searchArray = currentProductsArray.filter(product => {
        return product.name.toUpperCase().indexOf(filtro)> -1;
    })
    //console.log(searchArray);
    showPoductsList(searchArray);
        
        
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){ //URL
        if (resultObj.status === "ok"){
            sortAndShowProd(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProd(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProd(ORDER_DES_BY_PRICE);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function(){
        sortAndShowProd(ORDER_BY_RELEVANCE);
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

    document.getElementById("buscador").addEventListener("keyup", () => {
        buscar();
    });
        
});