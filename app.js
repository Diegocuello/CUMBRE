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
    document.querySelector('.presentation').style.display = 'none';
    document.getElementById('gestionClientes').style.display = 'block';
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
            clienteElem[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/la9una/web/tree/ba1073ae044ebb7b538a3b13f0f9598f7c410bb6/docs%2Fbootstrap%2Falignci.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/CLONATORE/markdowns/tree/82cfb03683ceb807a7091de48045e6a7485acd72/webpack.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "2")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/AlexLeonCord/esspia/tree/cd1617355861bfadb2ca7da805b9443c3dc57512/public%2Fclient.js?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "3")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/sgaribotto/programas/tree/5a88e9de5e66bf9f2494510298dfd9c088cfe96b/imprimirCarteles.php?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "4")
