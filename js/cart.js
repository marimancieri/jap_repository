let subtotalCarrito = 0;
let totalCarrito = 0;


function upDatePrecio(cant,precio,indice){
    let precioFinal = cant*precio;

    document.getElementById("totalProd"+indice).innerHTML = precioFinal;

    arrayCarrito[indice].count =cant;
    let subtotalCarrito = 0;
    for (i=0;i<arrayCarrito.length; i++){
        subtotalCarrito += arrayCarrito[i].count*arrayCarrito[i].unitCost;
    }
    document.getElementById("subtotal").innerHTML = subtotalCarrito;
    
}


function mostrarCarrito(array){
    let carrito = "";

    for (i=0;i<array.length; i++){
        let producto = array[i];
        if(producto.currency ==  "USD"){
            producto.unitCost = producto.unitCost*40; //cambio de mondeda a 40UYU
        }

        carrito += `
        <div class="row">
            <div class="col-3">
                <img src="` + producto.src + `" alt="` + producto.name + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ producto.name +`</h4>
                    
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <small class="text-muted">Precio Unitario: UYU `+ producto.unitCost +` </small>
                    <input type="number" class="form-control" min="0" id="cantidad`+i+`" 
                        value="`+producto.count+`" onChange="upDatePrecio(this.value,`+producto.unitCost+`,`+i+`)">
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <small class="text-muted">Total producto: </small>
                    <h4  id="totalProd`+i+`">`+producto.count*producto.unitCost+`</h4>
                    
                </div>
            </div>
        </div>`

        subtotalCarrito += producto.count*producto.unitCost;

        
    }
    
    document.getElementById("prodCarrito").innerHTML=carrito;
    document.getElementById("subtotal").innerHTML=subtotalCarrito;
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO2_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            arrayCarrito = resultObj.data.articles;
            mostrarCarrito(arrayCarrito);
        }
    });
});