
const eventos = {
  Zone7: {
    nombre: "Zone7",
    fecha: "15 de octubre de 2023",
    precio: 2000,
    entradas: 200,
  },
  TitaLau: {
    nombre: "TitaLau",
    fecha: "20 de noviembre de 2023",
    precio: 60000,
    entradas: 1500,
  },
  Wade: {
    nombre: "Wade",
    fecha: "5 de diciembre de 2023",
    precio: 45000,
    entradas: 2450,
  },
  Adricted: {
    nombre: "Adricted",
    fecha: "31 de diciembre de 2023",
    precio: 40000,
    entradas: 1000,
  },
};

function mostrarEventos() {
  let listaEventos = "Eventos disponibles:\n";
  let i = 1;

  for (let evento in eventos) {
    listaEventos += `${i}. ${eventos[evento].nombre} (${eventos[evento].fecha})\n`;
    i++;
  }

  return listaEventos;
}

function comprarEntradas(evento) {
  let cantidadEntradas = parseInt(prompt(`Selecciona la cantidad de entradas para ${evento.nombre} (Entradas disponibles: ${evento.entradas}):`));

  if (!isNaN(cantidadEntradas) && cantidadEntradas > 0 && cantidadEntradas <= evento.entradas) {
    let metodoPago = parseInt(prompt(`Selecciona el método de pago:\n1. Efectivo\n2. Crédito\n3. Débito`));

    if (!isNaN(metodoPago) && metodoPago >= 1 && metodoPago <= 3) {
      let total = cantidadEntradas * evento.precio;
      let mensajeMetodoPago = "";

      switch (metodoPago) {
        case 1:
          mensajeMetodoPago = "Efectivo";
          break;
        case 2:
          mensajeMetodoPago = "Crédito";
          break;
        case 3:
          mensajeMetodoPago = "Débito";
          break;
      }

      alert(`¡Compra confirmada!\nEvento: ${evento.nombre}\nFecha: ${evento.fecha}\nPrecio: ${evento.precio}\nCantidad de Entradas: ${cantidadEntradas}\nTotal: $${total}\nMétodo de Pago: ${mensajeMetodoPago}\n¡Gracias por tu compra!`);
    } else {
      alert("Método de pago no válido. Por favor, selecciona un método de pago válido.");
    }
  } else {
    alert("Cantidad de entradas no válida");
  }
}


alert("Bienvenido/a, presione aceptar para ver los eventos disponibles");

while (true) {
  let opcion = parseInt(prompt(`${mostrarEventos()}Ingresa el número correspondiente al evento que deseas o presiona Cancelar para salir:`));

  if (!isNaN(opcion) && opcion >= 1 && opcion <= Object.keys(eventos).length) {
    let eventoSeleccionado = Object.values(eventos)[opcion - 1];
    comprarEntradas(eventoSeleccionado);
  } else {
    alert("Opción no válida. Por favor, selecciona un evento válido.");
  }

  let continuar = confirm("¿Deseas comprar entradas para otro evento?");
  if (!continuar) {
    break;
  }
}

alert("Gracias por utilizar nuestro servicio. Esperamos que disfrutes del evento!");
