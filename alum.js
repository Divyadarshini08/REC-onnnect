function filterCards(type) {
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.filter-btn');

    

    // Remove active class from all buttons
    buttons.forEach(button => button.classList.remove('active'));
s
    // Add active class to the clicked button
    event.target.classList.add('active');

    // Show or hide cards based on filter
    cards.forEach(card => {
        if (type === 'all' || card.getAttribute('data-type') === type) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
