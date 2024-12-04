document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    const options = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 1.0 // Inicia la animación cuando el 100% del contador es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // Deja de observar una vez que se ha contado
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    function startCounter(counter) {
        counter.classList.add('visible'); // Agrega esta línea
        const target = +counter.getAttribute('data-target').replace(/,/g, ''); // Eliminar comas
        let count = 0;
        const speed = 3000; // Tiempo para alcanzar el objetivo en ms
        const increment = target / (speed / 100); // Incremento por cada intervalo

        const updateCount = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(updateCount);
            }
            counter.textContent = Math.floor(count).toLocaleString(); // Muestra el valor redondeado con comas
    }, 100);
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const hiddenElements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Cambia esto si es necesario
    });

    hiddenElements.forEach(el => {
        observer.observe(el);
    });
});

window.addEventListener('load', function () {
    // Ocultar el preloader
    document.body.classList.add('loaded');

    // Mostrar la imagen emergente después de un pequeño retraso
    setTimeout(() => {
        const notifier = document.getElementById('notifierElement');
        notifier.classList.remove('d-none');
    }, 500); // Ajusta el tiempo de aparición según lo necesites

    // Cerrar la imagen emergente al hacer clic fuera de la imagen
    const notifier = document.getElementById('notifierElement');
    notifier.addEventListener('click', function (e) {
        if (e.target === notifier) {
            notifier.classList.add('d-none');
        }
    });
});
