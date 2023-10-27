const eventos = [
    {
        id: "1",
        nombre: "ZONE 7",
        fecha: "15 de octubre de 2023",
        lugar: 'Crobar, Buenos Aires',
        precio: 2000,
        entradas: 200,
    },
    {
        id: "2",
        nombre: "TITA LAU",
        fecha: "20 de noviembre de 2023",
        lugar: 'Luna club, Ibiza',
        precio: 60000,
        entradas: 1500,
    },
    {
        id: "3",
        nombre: "WADE",
        fecha: "5 de diciembre de 2023",
        lugar: 'Criterio, Málaga',
        precio: 45000,
        entradas: 2450,
    },
    {
        id: "4",
        nombre: "ADRICTED",
        fecha: "31 de diciembre de 2023",
        lugar: 'Ciclo isis, Buenos Aires',
        precio: 40000,
        entradas: 1000,
    },
];
function mostrarEventos() {
    let listaEventos = "Eventos disponibles:\n";
    let i = 1;

    for (let evento in eventos) {
        listaEventos += `
        <div class="textContainer">
        <p> ${eventos[evento].id}: ${eventos[evento].nombre} - ${eventos[evento].lugar} - (${eventos[evento].fecha})</p> 
        </div>
        `;
        i++;
    }

    const eventosDOM = document.getElementById("eventoSeleccionado");
    eventosDOM.innerHTML = listaEventos;
}

function mostrarForm() {
    const ticketsDom = document.getElementById("tickets");


    let formHTML = `
    <div class="formulario"> 
    <label class="text" for="">Selecciona el evento</label>
    <input class="input" type="number" placeholder="" id="seleccionarEvento">

    <label class="text"for="">Selecciona la cantidad de entradas</label>
    <input class="input" type="number" placeholder="Cantidad de entradas" id="cantidadEntradas">

    <label class="text" for="pago">Selecciona el método de pago:\n1. Efectivo\n2. Crédito\n3. Débito</label>
    <input class="input" type="number" placeholder="Metodo de pago: 1" id="metodoPago"> 

    <button class="input"type="submit">Enviar</button>
    </div>`
    ticketsDom.innerHTML = formHTML;
}

mostrarEventos()
mostrarForm()

let tickets = document.getElementById("tickets");
tickets.addEventListener("submit", enviarForm);

function enviarForm(e) {
    e.preventDefault();
    /* Valores */
    let inputEventoId = document.getElementById("seleccionarEvento").value;
    let inputMetodoPago = document.getElementById("metodoPago").value;
    let inputCantidadEntradas = document.getElementById("cantidadEntradas").value;

    let eventoSeleccionado = ""
    /* Logica */

    switch (inputEventoId) {
        case "1":
            eventoSeleccionado = "ZONE";
            break;
        case "2":
            eventoSeleccionado = "TITA LAU";
            break;
        case "3":
            eventoSeleccionado = "WADE";
            break;
        case "4":
            eventoSeleccionado = "ADRICTED";
            break;
    }

    let eventoEncontrado = eventos.find((evento) => { return inputEventoId == evento.id })

    console.log(eventoEncontrado)


    let mensajeMetodoPago = ""
    switch (inputMetodoPago) {
        case "1":
            mensajeMetodoPago = "Efectivo";
            break;
        case "2":
            mensajeMetodoPago = "Crédito";
            break;
        case "3":
            mensajeMetodoPago = "Débito";
            break;
    }

    let venta = document.getElementById("venta");


    venta.innerHTML = `
<div class="ventaContainer">

    <p>¡Su compra para ${eventoSeleccionado}  ha sido confirmada!  \nMétodo de Pago: ${mensajeMetodoPago}\n¡Gracias por tu compra! 
    
    </p>
    <button class="btnComprar" onclick="otraVenta(event)">Compar otro ticket</button>
    </div>`
        ;

    const eventosDOM = document.getElementById("eventoSeleccionado");
    eventosDOM.innerHTML = "";
    tickets.innerHTML = ""

    let ticketVendido = {
        "nombre": eventoSeleccionado,
        "metodoPago": mensajeMetodoPago
    }
    localStorage.setItem('ticketVendido', ticketVendido);
}

function otraVenta(e) {
    let venta = document.getElementById("venta");
    venta.innerHTML = ""
    mostrarEventos()
    mostrarForm()
}
