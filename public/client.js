document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("recipe-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const recipeCards = document.querySelectorAll(".recipe-card");

      recipeCards.forEach((card) => {
        const recipeName = card.querySelector("h3").textContent.toLowerCase();
        const recipeDesc = card.querySelector("p").textContent.toLowerCase();

        if (
          recipeName.includes(searchTerm) ||
          recipeDesc.includes(searchTerm)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  const recipeForm = document.querySelector(".recipe-form");
  if (recipeForm) {
    const nameInput = recipeForm.querySelector("#name");
    const descInput = recipeForm.querySelector("#description");

    if (nameInput) {
      nameInput.addEventListener("blur", () => {
        if (nameInput.value.length < 3) {
          showError(nameInput, "Recipe name must be at least 3 characters");
        } else {
          clearError(nameInput);
        }
      });
    }
  }

  function showError(input, message) {
    clearError(input);
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "#f44336";
    error.style.fontSize = "14px";
    error.textContent = message;
    input.parentElement.appendChild(error);
  }

  function clearError(input) {
    const error = input.parentElement.querySelector(".error-message");
    if (error) error.remove();
  }
});
