document.getElementById('entrar').addEventListener('click', function() {
    alert('¡Bienvenido a Cumbre!');
});
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('¡Mensaje enviado!');
});

