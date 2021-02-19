const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');


for (let card of cards) {
    card.addEventListener("click", function() {
        const recipeId = card.getAttribute("id")
        window.location.href = `/recipe?id=${recipeId}`
    })
}

function Mudarestado(el) {
    const display = document.getElementById(el).style.display;
    if (display == "none")
      document.getElementById(el).style.display = 'block';
    else
      document.getElementById(el).style.display = 'none';
}

