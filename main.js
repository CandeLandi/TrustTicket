function mostrarEventos() {
    let listaEventos = `<div class="eventosProximos">
    <h2 class="tituloEP"> Próximos eventos</h2>
    </div>`;
    let i = 1;

    for (let index = 0; index < 4; index++) {
        const evento = eventos[index];
        listaEventos += `
        <div class="comprarContainer">
        <div class="textContainer">
        <span >${evento.name}</span>
        <span class="fechaEvento">${evento.dates.start.localDate}</span>
        </div>
        <div class="btnComprarContainer">
        <button class="btnComprar" onclick="enviarForm(event,'${evento.id}')"> Comprar <button>
        </div>
        </div>
        `;
    }
    const eventosDOM = document.getElementById("eventoSeleccionado");
    eventosDOM.innerHTML = listaEventos;
}



function misTickets() {
    let ticketsComprado = []

    ticketsComprado = JSON.parse(localStorage.getItem('ticketsVendido'));

    if (ticketsComprado) {
        const ticket = document.getElementById("ticketComprados");
        ticketsComprado.forEach(ticketC => {
            ticket.innerHTML +=
                `
        <div class="miTicket">
         <h3 id="titulo"> Mi ticket </3>
         <p id="descripcion"> Evento: ${ticketC.name} </p>
         <p id="descripcion"> Ubicación: ${ticketC.lugar} </p>
         <p id="descripcion">  Fecha: ${ticketC.fecha} </p>
         </div>
    `
        });
    }

};

function mostrarForm() {
    const ticketsDom = document.getElementById("tickets");

    let formHTML = `
    <div class="formulario"> 

    <label class="text"for="">Selecciona la cantidad de entradas</label>
    <input class="input" type="number" placeholder="Cantidad de entradas" id="cantidadEntradas">

    <label class="text" for="pago">Selecciona el método de pago:\n1. Efectivo\n2. Crédito\n3. Débito</label>
    <input class="input" type="number" placeholder="Metodo de pago: 1" id="metodoPago"> 


    </div>`
    ticketsDom.innerHTML = formHTML;
}


mostrarForm()
misTickets()


let tickets = document.getElementById("tickets");
tickets.addEventListener("submit", enviarForm);

function enviarForm(e, evento) {
    console.log(evento)
    e.preventDefault();

    let inputEventoId = evento;
    let inputMetodoPago = document.getElementById("metodoPago").value;
    let inputCantidadEntradas = document.getElementById("cantidadEntradas").value;


    /* Busca el evento con el ID que envio por parametro en la lista de evento para obtener toda la
    informacion del evento seleccionado */
    let eventoEncontrado = eventos.find((evento) => { return inputEventoId == evento.id })
    let mensajeMetodoPago = ""
    switch (inputMetodoPago) {
        case "1":
            mensajeMetodoPago = `<p>Efectivo</p>`;
            break;
        case "2":
            mensajeMetodoPago = `<p>Crédito</p>`;
            break;
        case "3":
            mensajeMetodoPago = `<p>Débito</p>`;
            break;
    }

    let venta = document.getElementById("venta");

    venta.innerHTML = `
    <div class="ventaContainer">
    <p>¡Su compra para ${eventoEncontrado.name}  ha sido confirmada!</p> <p> \nMétodo de Pago: ${mensajeMetodoPago}\n¡Gracias por tu compra! 
    </p>
    <button class="btnOpcion" onclick="otraVenta(event)">Compar otro ticket </button>
    </div>`;

    tickets.innerHTML = ""

    let ticketVendido = {
        "name": eventoEncontrado.name,
        "metodoPago": mensajeMetodoPago,
        "lugar": eventoEncontrado._embedded.venues[0].city.name,
        "fecha": eventoEncontrado.dates.start.localDate
    }

    ticketsVendido = JSON.parse(localStorage.getItem('ticketsVendido'));
    if (ticketsVendido) {
        ticketsVendido.push(ticketVendido)
    } else {
        ticketsVendido = [];
        ticketsVendido.push(ticketVendido);
    }


    localStorage.setItem('ticketsVendido', JSON.stringify(ticketsVendido));
    misTickets()
}

let ticketVendidos = [];



function otraVenta(e) {
    let venta = document.getElementById("venta");
    venta.innerHTML = ""
    mostrarForm()
    mostrarEventos()

}



const apiKey = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=YFxMTPPfGHgoat6nyq5tITBc7LESG7eO'

const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`
function obtenerEventos() {
    fetch(apiKey)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos')
            }

            return response.json()
        })
        .then(data => {
            eventos = data._embedded.events
            mostrarEventos()
        })
}

obtenerEventos()


