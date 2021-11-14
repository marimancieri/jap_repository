let subtotalCarrito = 0;
let totalCarrito = 0;
let costoEnvio = 0;
let arrayCarrito = []

PRODUCT_PAGE = "products.html";

function upDateEnvio(){
    let tipoEnvio = document.getElementsByName('envioType');

    for (let i = 0; i < tipoEnvio.length; i++) {
        if (tipoEnvio[i].checked) {
            if(i == 0){
                costoEnvio = subtotalCarrito*0.15;
            }
            else if(i == 1){
                costoEnvio = subtotalCarrito*0.07;
            }
            else if(i == 2){
                costoEnvio = subtotalCarrito*0.05;
            }
        }
    }
    document.getElementById("costoDeEnvio").innerHTML = costoEnvio;
    document.getElementById("totalCarrito").innerHTML = subtotalCarrito+costoEnvio;
}

function upDatePrecio(cant,precio,indice){
    let precioFinal = cant*precio;

    document.getElementById("totalProd"+indice).innerHTML = precioFinal;

    arrayCarrito[indice].count = cant;
    
    subtotalCarrito = 0;
    for (i=0;i<arrayCarrito.length; i++){
        subtotalCarrito += arrayCarrito[i].count*arrayCarrito[i].unitCost;
    }

    upDateEnvio()
    

    
    document.getElementById("subtotal").innerHTML = subtotalCarrito;
    document.getElementById("costoDeEnvio").innerHTML = costoEnvio;
    document.getElementById("totalCarrito").innerHTML = subtotalCarrito+costoEnvio;
    
}


function mostrarCarrito(array){
    let carrito = "";
    subtotalCarrito = 0;
    totalCarrito = 0;
    costoEnvio = 0;

    for (i=0;i<array.length; i++){
        let producto = array[i];
        if(producto.currency ==  "USD"){
            producto.unitCost = producto.unitCost*40; //cambio de mondeda a 40UYU
        }

        carrito += `
        <div class="row" >
            <div class="col-3">
                <img src="` + producto.src + `" alt="` + producto.name + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="row">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <small class="text-muted">Precio Unitario: </small>
                        <h4>UYU `+ producto.unitCost +`</h4>
                    </div>
                    <div class="col">
                        <small class="text-muted">Cantidad: </small>
                        <input type="number" class="form-control" min="0" id="cantidad`+i+`" 
                        value="`+producto.count+`" onChange="upDatePrecio(this.value,`+producto.unitCost+`,`+i+`)">
                    </div>
                    <div class="col">
                        <small class="text-muted">Total producto: </small>
                        <h4  id="totalProd`+i+`">`+producto.count*producto.unitCost+`</h4>
                    </div>
                </div>
            </div>
            <div class="col-1">
            <button class="btn btn-light" onclick="borrarElemento(`+i+`)"><i class="fas fa-trash"></i></button>
            </div>
        </div>`

        subtotalCarrito += producto.count*producto.unitCost;
        upDateEnvio();
        totalCarrito = subtotalCarrito + costoEnvio;
        
        
    }

    if(array.length ==0){
        carrito += `
        <div class="row" >

                <h1 > ¡Hay un carrito que llenar!</h1>
            
        </div>
        `
        subtotalCarrito = 0;
        costoEnvio = 0;
        totalCarrito = 0;
    }
    
    document.getElementById("prodCarrito").innerHTML=carrito;
    document.getElementById("subtotal").innerHTML=subtotalCarrito;
    document.getElementById("costoDeEnvio").innerHTML = costoEnvio;
    document.getElementById("totalCarrito").innerHTML=totalCarrito;

}

function validarCampos(){
    let elementosEnCarrito= false;
    let direccionCalle = document.getElementById('direccionCalle');
    let direccionNumero = document.getElementById('direccionNumero');
    let direccionEsquina = document.getElementById('direccionEsquina');
    let pais = document.getElementById('pais');
    let tipoEnvio = document.getElementsByName('envioType');
    let tipoEnvioValido = false;
    let opcPago = document.getElementsByName('pagoType');

    let tcNombreTitular = document.getElementById('nombreTitularTC');
    let tcNoTarjeta = document.getElementById('noTarjeta');
    let tcCVV = document.getElementById('cvv');
    let tcVenc = document.getElementById('venc');
    let tbNombreTitular = document.getElementById('nombreTitularTB');
    let tbNoCuenta = document.getElementById('noCuenta');
    let tbSucursal = document.getElementById('suc');
    let tcredito = [tcNombreTitular.value, tcNoTarjeta.value, tcCVV.value, tcVenc.value];
    let tb = [tbNombreTitular.value, tbNoCuenta.value, tbSucursal.value]
    let opcPagoValido = false;

    let camposValidos = 0;

    if(arrayCarrito.length != 0){
        elementosEnCarrito = true;
    }

    for (let i = 0; i < tipoEnvio.length; i++) {
        if(tipoEnvio[i].checked){
            tipoEnvioValido = true;
        }    
    }

    for (let i = 0; i < opcPago.length; i++) {
        if(opcPago[i].checked){
            let tcValido = 0;
            let tbValido = 0;

            for(i=0; i < tcredito.length; i++){
                if(tcredito[i]!=""){
                    tcValido +=1;
                }
            }
            if(tcValido == tcredito.length){
                opcPagoValido = true;
            }

            for(i=0; i<tb.length; i++){
                if(tb[i]!=""){
                    tbValido +=1;
                }
            }
            if(tbValido == tb.length){
                opcPagoValido = true;
            }
            
        }    
    }

    let campos=[elementosEnCarrito, direccionCalle.value, direccionNumero.value, direccionEsquina.value, pais.value, tipoEnvioValido, opcPagoValido];
    console.log(campos);

    for(i=0; i < campos.length; i++){
        if(campos[i]!='' || campos[i]==true){
            camposValidos += 1; 
        }
    }
    console.log(camposValidos);
    if(camposValidos == campos.length){
        swal("Compra realizada con éxito", "Pronto recibiras la información en tu correo", "success")
        .then((value) => {
            window.location.href=PRODUCT_PAGE;
        });
        
    }
    else{
        swal("Debe completar todos los campos", "Revise los campos en rojo","warning");
    }
    
    

}

function borrarElemento(index){
    arrayCarrito.splice(index,1);
    mostrarCarrito(arrayCarrito);
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


//funcion validacion BOOTSTRAP
