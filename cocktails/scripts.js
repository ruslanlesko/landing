// Function to load cocktail data from JSON
async function loadCocktails() {
    const response = await fetch('cocktails.json');
    const cocktails = await response.json();
    const cocktailList = document.getElementById('cocktail-list');

    cocktailList.innerHTML = ''; // Clear any existing content

    cocktails.forEach((cocktail, index) => {
        // Create cocktail card
        const cocktailElement = document.createElement('div');
        cocktailElement.classList.add('cocktail');
        cocktailElement.setAttribute('onclick', `toggleIngredients('ingredients-${index}')`);

        cocktailElement.innerHTML = `
            <img src="${cocktail.imageUrl}" alt="${cocktail.title}">
            <div class="cocktail-info">
                <h2 class="cocktail-name">${cocktail.title}</h2>
                <p class="cocktail-subtitle">${cocktail.kind}</p>
                <div class="ingredients" id="ingredients-${index}">
                    <ul>
                        ${cocktail.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        cocktailList.appendChild(cocktailElement);
    });
}

// Function to collapse all other ingredients when one is expanded
function toggleIngredients(id) {
    const allIngredients = document.querySelectorAll('.ingredients');

    // Collapse all ingredients except the one being clicked
    allIngredients.forEach(ingredient => {
        if (ingredient.id !== id) {
            ingredient.style.maxHeight = null;
        }
    });

    // Get the clicked section
    const ingredients = document.getElementById(id);
    if (ingredients.style.maxHeight) {
        ingredients.style.maxHeight = null;
    } else {
        ingredients.style.maxHeight = ingredients.scrollHeight + "px";
    }
}

// Load cocktails on page load
document.addEventListener('DOMContentLoaded', loadCocktails);