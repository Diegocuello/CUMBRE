// Datos iniciales
let clientesSemanales = JSON.parse(localStorage.getItem('clientesSemanales')) || {};
let clientesQuincenales = JSON.parse(localStorage.getItem('clientesQuincenales')) || {};
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || {};

// Guardar datos en Local Storage
function guardarDatos() {
    localStorage.setItem('clientesSemanales', JSON.stringify(clientesSemanales));
    localStorage.setItem('clientesQuincenales', JSON.stringify(clientesQuincenales));
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Mostrar y ocultar secciones
document.getElementById('entrar').addEventListener('click', function() {
    window.location.href = 'clients.html'; // Redirigir a la nueva pantalla
});

document.getElementById('botonSemanales').addEventListener('click', function() {
    mostrarSeccion('semanales');
});
document.getElementById('botonQuincenales').addEventListener('click', function() {
    mostrarSeccion('quincenales');
});
document.getElementById('botonPedidos').addEventListener('click', function() {
    mostrarSeccion('pedidos');
});

function mostrarSeccion(seccionId) {
    document.getElementById('semanales').style.display = 'none';
    document.getElementById('quincenales').style.display = 'none';
    document.getElementById('pedidos').style.display = 'none';
    document.getElementById(seccionId).style.display = 'block';
}
// Agregar clientes
document.getElementById('addClientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('clientName').value;
    const dia = document.getElementById('clientDay').value;
    const tipo = document.getElementById('clientType').value;

    if (tipo === 'semanal') {
        if (!clientesSemanales[dia]) clientesSemanales[dia] = [];
        clientesSemanales[dia].push({ nombre, visitado: false });
    } else {
        if (!clientesQuincenales[dia]) clientesQuincenales[dia] = [];
        clientesQuincenales[dia].push({ nombre, visitado: false });
    }
    guardarDatos();
    document.getElementById('addClientForm').reset();
    alert('¡Cliente agregado!');
});

// Función para guardar pedidos
document.getElementById('guardarPedido').addEventListener('click', function() {
    var pedidoTexto = document.getElementById('pedidoTexto').value;
    if (pedidoTexto) {
        var listaPedidos = document.getElementById('listaPedidos');
        var nuevoPedido = document.createElement('div');
        nuevoPedido.textContent = pedidoTexto;
        listaPedidos.appendChild(nuevoPedido);
        guardarDatos();

        document.getElementById('pedidoTexto').value = '';
    }
});

// Mostrar clientes
function mostrarClientes() {
    var listaClientesSemanales = document.getElementById('listaClientesSemanales');
    var listaClientesQuincenales = document.getElementById('listaClientesQuincenales');
    listaClientesSemanales.innerHTML = '';
    listaClientesQuincenales.innerHTML = '';

    // Mostrar clientes semanales
    Object.keys(clientesSemanales).forEach(dia => {
        clientesSemanales[dia].forEach(cliente => {
            var clienteElem = document.createElement('div');
            clienteElem.innerHTML = `
                <input type="checkbox" id="${cliente.nombre}" ${cliente.visitado ? 'checked' : ''}>
                <label for="${cliente.nombre}">${cliente.nombre}</label>
            `;
            listaClientesSemanales.appendChild(clienteElem);
        });
    });

    // Mostrar clientes quincenales
    Object.keys(clientesQuincenales).forEach(dia => {
        clientesQuincenales[dia].forEach(cliente => {
            var clienteElem = document.createElement('div');
            clienteElem.innerHTML = `
                <input type="checkbox" id="${cliente.nombre}" ${cliente.visitado ? 'checked' : ''}>
                <label for="${cliente.nombre}">${cliente.nombre}</label>
            `;
            listaClientesQuincenales.appendChild(clienteElem);
        });
    });
}
mostrarClientes();

// Resetear visitas semanalmente
function resetearVisitas() {
    const diaActual = new Date().getDay();
    if (diaActual === 0) {
        Object.keys(clientesSemanales).forEach(dia => {
            clientesSemanales[dia].forEach(cliente => cliente.visitado = false);
        });
        guardarDatos();
    }
}
resetearVisitas();
