function toggleContent(card) {
    var fullText = card.querySelector('.full-text');
    var summaryText = card.querySelector('.card-text-summary');
    var isExpanded = card.classList.contains('card-expanded');
    var button = card.querySelector('.show-more');
    var socialIcons = document.querySelector('.social-icons');

    // Colapsar todas las tarjetas abiertas antes de expandir la nueva
    var allCards = document.querySelectorAll('.card');
    allCards.forEach(function (otherCard) {
        if (otherCard !== card && otherCard.classList.contains('card-expanded')) {
            var otherFullText = otherCard.querySelector('.full-text');
            var otherSummaryText = otherCard.querySelector('.card-text-summary');
            otherFullText.style.display = 'none';
            otherSummaryText.style.display = '-webkit-box';
            otherCard.classList.remove('card-expanded');
            var otherButton = otherCard.querySelector('.show-more');
            otherButton.textContent = 'Ver más';
        }
    });

    if (isExpanded) {
        // Colapsar la tarjeta
        fullText.style.display = 'none';
        summaryText.style.display = '-webkit-box';
        card.classList.remove('card-expanded');
        button.textContent = 'Ver más';
        socialIcons.style.display = 'flex';
        card.style.width = '';
        card.style.margin = '';
    } else {
        // Expandir la tarjeta
        fullText.style.display = 'block';
        summaryText.style.display = 'none';
        card.classList.add('card-expanded');
        button.textContent = 'Ver menos';
        socialIcons.style.display = 'none';

        // Ajustar el ancho de la tarjeta
        const mainContainer = document.querySelector('main.container');
        const containerWidth = mainContainer.clientWidth;
        const desiredCardWidth = containerWidth * 0.95;
        card.style.width = desiredCardWidth + 'px';
        card.style.maxWidth = '100%';
        card.style.marginLeft = 'auto';
        card.style.marginRight = 'auto';
        card.style.padding = '0';

        // Ajustar la vista para que la tarjeta sea visible tanto en el eje X como en el Y
        const cardRect = card.getBoundingClientRect();
        const containerRect = mainContainer.getBoundingClientRect();

        // Calcular el desplazamiento necesario
        const scrollX = cardRect.left + window.scrollX - (window.innerWidth - cardRect.width) / 2;
        const scrollY = cardRect.top + window.scrollY - (window.innerHeight - cardRect.height) / 2;

        window.scrollTo({
            left: scrollX,
            top: scrollY,
            behavior: 'smooth'
        });
    }
}
