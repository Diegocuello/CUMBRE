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

// Función para guardar pedidos
document.getElementById('guardarPedido').addEventListener('click', function() {
    var pedidoTexto = document.getElementById('pedidoTexto').value;
    if (pedidoTexto) {
        var listaPedidos = document.getElementById('listaPedidos');
        var nuevoPedido = document.createElement('div');
        nuevoPedido.textContent = pedidoTexto;
        listaPedidos.appendChild(nuevoPedido);

        document.getElementById('pedidoTexto').value = '';
    }
});
