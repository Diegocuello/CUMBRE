// Datos iniciales
let clientesSemanales = JSON.parse(localStorage.getItem('clientesSemanales')) || {};
let clientesQuincenales = JSON.parse(localStorageStorage.getItem('clientesQuincenales')) || {};
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || {};

// Guardar datos en Local Storage
function guardarDatos() {
    localStorage.setItem('clientesSemanales', JSON.stringify(clientesSemanales));
    localStorage.setItem('clientesQuincenales', JSON.stringify(clientesQuincenales));
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Manejar la subida de fotos
document.getElementById('uploadPhotoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const photoInput = document.getElementById('pedidoPhoto');
    const photoFile = photoInput.files[0];

    if (!photoFile) {
        alert('Por favor, sube una foto.');
        return;
    }

    // Aquí llamaríamos a una API de OCR para procesar la foto
    // Ejemplo usando una API de OCR ficticia
    const formData = new FormData();
    formData.append('image', photoFile);

    fetch('https://api.ocr.example.com/extract', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const codigosArticulos = data.text;
        procesarCodigosArticulos(codigosArticulos);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al procesar la foto.');
    });
});

function procesarCodigosArticulos(texto) {
    // Aquí procesaríamos el texto extraído de la foto
    // Ejemplo básico para dividir por líneas y mostrar los códigos y artículos
    const lineas = texto.split('\n');
    lineas.forEach(linea => {
        console.log('Código/Artículo:', linea);
        // Aquí puedes agregar lógica para guardar los códigos y artículos en el sistema
    });
}
// Agregar clientes
document.getElementById('addClientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('clientName').value;
    const dia = document.getElementById('clientDay').value;
    const tipo = document.getElementById('clientType').value;

    if (!nombre || !dia || !tipo) {
        alert('Por favor, complete todos los campos.');
        return;
    }

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
document.getElementById('addBlankPedido').addEventListener('click', function() {
    const pedidoTexto = document.getElementById('pedidoTexto').value.trim();
    if (pedidoTexto === "") {
        alert('Por favor, escribe el pedido.');
        return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];
    if (!pedidos[fechaActual]) pedidos[fechaActual] = [];
    pedidos[fechaActual].push({ pedidoTexto, enviado: false });
    guardarDatos();
    document.getElementById('pedidoTexto').value = '';
    alert('¡Pedido agregado!');
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

// Buscar pedidos por fecha
document.getElementById('buscarPedido').addEventListener('click', function() {
    var fecha = document.getElementById('buscarFecha').value;
    if (fecha) {
        mostrarHistorialPedidos(fecha);
    }
});

function mostrarHistorialPedidos(fecha) {
    var listaHistorialPedidos = document.getElementById('listaHistorialPedidos');
    listaHistorialPedidos.innerHTML = '';
    if (pedidos[fecha]) {
        pedidos[fecha].forEach(pedido => {
            var pedidoElem = document.createElement('div');
            pedidoElem.textContent = `${pedido.pedidoTexto}`;
            listaHistorialPedidos.appendChild(pedidoElem);
        });
    } else {
        listaHistorialPedidos.innerHTML = '<p>No hay pedidos para esta fecha.</p>';
    }
}
// Resetear visitas semanalmente
function resetearVisitas() {
    const diaActual = new Date().getDay();
    if (diaActual === 0) { // 0 representa el domingo
        Object.keys(clientesSemanales).forEach(dia => {
            clientesSemanales[dia].forEach(cliente => cliente.visitado = false);
        });
        guardarDatos();
    }
}
resetearVisitas();

// Función para tachar pedidos
function tacharPedido(fecha, index) {
    pedidos[fecha][index].enviado = !pedidos[fecha][index].enviado;
    guardarDatos();
    mostrarPedidos(fecha);
}

// Función para compartir en WhatsApp
document.getElementById('compartirWhatsApp').addEventListener('click', function() {
    const fechaActual = new Date().toISOString().split('T')[0];
    const pedidosParaEnviar = pedidos[fechaActual].filter(pedido => !pedido.enviado);
    const textoPedidos = pedidosParaEnviar.map(pedido => `${pedido.pedidoTexto}`).join('\n');
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoPedidos)}`;
    window.open(url, '_blank');
});
