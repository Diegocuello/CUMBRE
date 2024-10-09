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

//
