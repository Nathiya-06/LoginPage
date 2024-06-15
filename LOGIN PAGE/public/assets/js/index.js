// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD1DSNdof4Y1t7zC7DVvm1rDV6rOXRGH6o",
    authDomain: "moonbuckscafe-fd94c.firebaseapp.com",
    projectId: "moonbuckscafe-fd94c",
    storageBucket: "moonbuckscafe-fd94c.appspot.com",
    messagingSenderId: "576834325322",
    appId: "1:576834325322:web:b5bed0e9332666267b8fb3"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to login form submission
    document.getElementById("loginForm").addEventListener('submit', function (event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Get username and password from form inputs
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Validate input fields
        var usernameError = validateUsername(username);
        var passwordError = validatePassword(password);

        // Display error messages
        document.getElementById("usernameError").textContent = usernameError;
        document.getElementById("passwordError").textContent = passwordError;

        // If there are no errors, proceed with login
        if (!usernameError && !passwordError) {
            // Set user data to the database
            set(ref(db, 'user/' + username), {
                username: username,
                password: password
            })
                .then(() => {
                    // Clear form fields
                    document.getElementById("loginForm").reset();
                    document.getElementById("errorMessage").textContent = ""; // Clear any previous error message
                    alert("Login successful");
                })
                .catch((error) => {
                    // Handle errors
                    document.getElementById("errorMessage").textContent = "Error: " + error.message;
                });
        }
    });
});

// Function to validate username
function validateUsername(username) {
    if (username.trim() === "") {
        return "Username is required";
    }
    return "";
}

// Function to validate password
function validatePassword(password) {
    if (password.trim() === "") {
        return "Password is required";
    }
    if (password.length <= 8) {
        return "Password must be greater than 8 characters";
    }
    return "";
}