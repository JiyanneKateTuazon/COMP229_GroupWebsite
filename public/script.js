const users = document.querySelectorAll(".user-list li");

users.forEach(user => {
    user.addEventListener("click", () => {
        alert(`user selected: ${user.textContent.trim()}`);
    });
});

// Select form and input elements
const form = document.getElementById("signInForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// Handle form submission
form.addEventListener("submit", function (event) {
    // Clear any previous error message
    errorMessage.style.visibility = "hidden";
    errorMessage.textContent = "";

    // Check if fields are empty
    if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
        event.preventDefault(); // Prevent form submission
        errorMessage.textContent = "Username and Password cannot be empty!";
        errorMessage.style.visibility = "visible";
    }
});
