const bakeryProducts = [
    { id: "bread", name: "Artisan Bread" },
    { id: "pastries", name: "Fresh Pastries" },
    { id: "cake", name: "Custom Cakes" }
];

function getFavorites() {
    return JSON.parse(localStorage.getItem("bakeryFavorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

function toggleFavorite(productId) {
    let favorites = getFavorites();

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }

    saveFavorites(favorites);
    displayFavorites();
}

function displayFavorites() {
    const favorites = getFavorites();
    const favoriteList = document.getElementById("favorite-list");

    if (!favoriteList) return;

    favoriteList.innerHTML = "";

    if (favorites.length === 0) {
        favoriteList.textContent = "You have not selected any favorites yet.";
        return;
    }

    favorites.forEach(id => {
        const product = bakeryProducts.find(item => item.id === id);

        if (product) {
            const item = document.createElement("li");
            item.textContent = product.name;
            favoriteList.appendChild(item);
        }
    });
}

document.addEventListener("DOMContentLoaded", displayFavorites);

const validationMessages = {
    nameRequired: "Please enter your full name.",
    nameLength: "Name must be at least 3 characters.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address."
};

const formFields = {
    form: document.getElementById("contact-form"),
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    nameError: document.getElementById("name-error"),
    emailError: document.getElementById("email-error")
};

function clearErrors() {
    if (formFields.nameError) {
        formFields.nameError.textContent = "";
    }

    if (formFields.emailError) {
        formFields.emailError.textContent = "";
    }
}

function validateName() {
    const nameValue = formFields.name.value.trim();

    if (nameValue === "") {
        formFields.nameError.textContent = validationMessages.nameRequired;
        return false;
    }

    if (nameValue.length < 3) {
        formFields.nameError.textContent = validationMessages.nameLength;
        return false;
    }

    return true;
}

function validateEmail() {
    const emailValue = formFields.email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        formFields.emailError.textContent = validationMessages.emailRequired;
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        formFields.emailError.textContent = validationMessages.emailInvalid;
        return false;
    }

    return true;
}

function validateContactForm(event) {
    clearErrors();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isEmailValid) {
        event.preventDefault();
    }
}

if (formFields.form) {
    formFields.form.addEventListener("submit", validateContactForm);
}