

//hasheo local sin DB
document.addEventListener("DOMContentLoaded", function() {
    // Toggle entre formularios de inicio de sesión y registro
    document.getElementById("toggleForm").addEventListener("click", function() {
        document.getElementById("loginContainer").classList.add("hidden");
        document.getElementById("signupContainer").classList.remove("hidden");
    });

    document.getElementById("toggleLoginForm").addEventListener("click", function() {
        document.getElementById("signupContainer").classList.add("hidden");
        document.getElementById("loginContainer").classList.remove("hidden");
    });

    // Función para calcular el hash SHA-256 de una cadena
    async function sha256(plainText) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plainText);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Obtener elementos del DOM
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const welcomeText = document.getElementById("welcomeText");

    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    let userIdCounter = localStorage.getItem("userIdCounter") || 0;

    // Agregar evento de envío para el formulario de inicio de sesión
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener valores de los campos de entrada
        const username = document.getElementById("loginCredential").value;
        const password = document.getElementById("loginPassword").value;

        // Buscar el usuario en la lista de usuarios registrados
        const foundUser = registeredUsers.find(user => user.username === username);
        if (foundUser) {
            // Hashear la contraseña ingresada y compararla con la almacenada
            const hashedPassword = await sha256(password);
            if (hashedPassword === foundUser.password) {
                console.log("Inicio de sesión exitoso para:", username);
                // Mostrar la alerta de bienvenida
                showWelcomeAlert(username);
            } else {
                alert("Contraseña incorrecta. Por favor, inténtelo de nuevo.");
            }
        } else {
            alert("Usuario no encontrado. Por favor, registre su cuenta.");
        }
    });

    // Agregar evento de envío para el formulario de registro
    signupForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos de entrada
    const newUsername = document.getElementById("newUsername").value;
    const email = document.getElementById("newEmail").value;
    const faculty = document.getElementById("newFaculty").value;
    const phone = document.getElementById("newPhone").value;
    const newPassword = document.getElementById("newPassword").value;

    // Verificar si el nombre de usuario ya está en uso
    const usernameExists = registeredUsers.some(user => user.username === newUsername);
    if (usernameExists) {
        alert("El nombre de usuario ya está en uso. Por favor, elija otro.");
        return;
    }

    // Validar contraseña para no contener caracteres especiales
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialChars.test(newPassword)) {
        alert("La contraseña no puede contener caracteres especiales.");
        return;
    }

    // Hashear la contraseña
    const hashedPassword = await sha256(newPassword);

    // Registrar nuevo usuario
    const newUser = {
        id: ++userIdCounter,
        username: newUsername,
        email: email,
        faculty: faculty,
        phone: phone,
        password: hashedPassword
    };

    // Almacenar el nuevo usuario
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    localStorage.setItem("userIdCounter", userIdCounter);

    // Mostrar la alerta de bienvenida
    showWelcomeAlert(newUsername);

    // Mostrar mensaje de confirmación de registro
    alert(`¡Usuario registrado con éxito! Ahora puedes iniciar sesión como ${newUsername}.`);

    console.log("Registrando usuario:", newUser);
});


    // Función para mostrar la alerta de bienvenida
    function showWelcomeAlert(username) {
        welcomeText.textContent = `¡Bienvenido, ${username}!`;
        welcomeMessage.style.display = "block";

        // Ocultar la alerta después de 3 segundos
        setTimeout(function() {
            welcomeMessage.style.display = "none";
        }, 3000);
    }
});