

function mostrarCarrito(array){
    let carrito = "";

    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        carrito += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.src + `" alt="` + producto.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                        <p class="text-muted">` + producto.currency +` `+ producto.unitCost +` </p>
                    </div>
                    
                    <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted"> Vendidos: </small>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById('prodCarrito').innerHTML = carrito;

}   




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            arrayCarrito = resultObj.data.articles;
            mostrarCarrito(arrayCarrito);
        }
    });
});