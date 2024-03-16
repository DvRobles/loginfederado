// //hasheo local sin DB
// document.addEventListener("DOMContentLoaded", function() {
//     // Toggle entre formularios de inicio de sesión y registro
//     document.getElementById("toggleForm").addEventListener("click", function() {
//         document.getElementById("loginContainer").classList.add("hidden");
//         document.getElementById("signupContainer").classList.remove("hidden");
//     });

//     document.getElementById("toggleLoginForm").addEventListener("click", function() {
//         document.getElementById("signupContainer").classList.add("hidden");
//         document.getElementById("loginContainer").classList.remove("hidden");
//     });

//     // Función para calcular el hash SHA-256 de una cadena
//     async function sha256(plainText) {
//         const encoder = new TextEncoder();
//         const data = encoder.encode(plainText);
//         const hash = await crypto.subtle.digest('SHA-256', data);
//         return Array.from(new Uint8Array(hash))
//             .map(byte => byte.toString(16).padStart(2, '0')).join('');
//     }

//     // Obtener elementos del DOM
//     const loginForm = document.getElementById("loginForm");
//     const signupForm = document.getElementById("signupForm");
//     const welcomeMessage = document.getElementById("welcomeMessage");
//     const welcomeText = document.getElementById("welcomeText");

//     let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
//     let userIdCounter = localStorage.getItem("userIdCounter") || 0;

//     // Agregar evento de envío para el formulario de inicio de sesión
// // Agregar evento de envío para el formulario de inicio de sesión
// loginForm.addEventListener("submit", async function(event) {
//     event.preventDefault(); // Evitar el envío del formulario por defecto

//     // Obtener valores de los campos de entrada
//     const username = document.getElementById("loginCredential").value;
//     const password = document.getElementById("loginPassword").value;

//     // Buscar el usuario en la lista de usuarios registrados
//     const foundUser = registeredUsers.find(user => user.username === username);
//     if (foundUser) {
//         // Hashear la contraseña ingresada y compararla con la almacenada
//         const hashedPassword = await sha256(password);
//         if (hashedPassword === foundUser.password) {
//             console.log("Inicio de sesión exitoso para:", username);
//             // Almacenar el nombre de usuario en sessionStorage
//             sessionStorage.setItem("loggedInUser", username);
//             // Redirigir a la página de perfil
//             window.location.href = "perfil/perfil.html";
//         } else {
//             alert("Contraseña incorrecta. Por favor, inténtelo de nuevo.");
//         }
//     } else {
//         alert("Usuario no encontrado. Por favor, registre su cuenta.");
//     }
// });

//     // Agregar evento de envío para el formulario de registro
//     signupForm.addEventListener("submit", async function(event) {
//         event.preventDefault(); // Evitar el envío del formulario por defecto

//         // Obtener valores de los campos de entrada
//         const newUsername = document.getElementById("newUsername").value;
//         const email = document.getElementById("newEmail").value;
//         const faculty = document.getElementById("newFaculty").value;
//         const phone = document.getElementById("newPhone").value;
//         const newPassword = document.getElementById("newPassword").value;

//         // Verificar si el nombre de usuario ya está en uso
//         const usernameExists = registeredUsers.some(user => user.username === newUsername);
//         if (usernameExists) {
//             alert("El nombre de usuario ya está en uso. Por favor, elija otro.");
//             return;
//         }

//         // Validar contraseña para no contener caracteres especiales
//         const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
//         if (specialChars.test(newPassword)) {
//             alert("La contraseña no puede contener caracteres especiales.");
//             return;
//         }

//         // Hashear la contraseña
//         const hashedPassword = await sha256(newPassword);

//         // Registrar nuevo usuario
//         const newUser = {
//             id: ++userIdCounter,
//             username: newUsername,
//             email: email,
//             faculty: faculty,
//             phone: phone,
//             password: hashedPassword
//         };

//         // Almacenar el nuevo usuario
//         registeredUsers.push(newUser);
//         localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
//         localStorage.setItem("userIdCounter", userIdCounter);

//         // Mostrar la alerta de bienvenida
//         showWelcomeAlert(newUsername);

//         // Mostrar mensaje de confirmación de registro
//         alert(`¡Usuario registrado con éxito! Ahora puedes iniciar sesión como ${newUsername}.`);

//         console.log("Registrando usuario:", newUser);
//     });

//     // Función para mostrar la alerta de bienvenida
//     function showWelcomeAlert(username) {
//         welcomeText.textContent = `¡Bienvenido, ${username}!`;
//         welcomeMessage.style.display = "block";

//         // Ocultar la alerta después de 3 segundos
//         setTimeout(function() {
//             welcomeMessage.style.display = "none";
//         }, 3000);
//     }
// });




//! funcional

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

    // Agregar evento de envío para el formulario de registro
    const signupForm = document.getElementById("signupForm");
    const signupButton = document.querySelector('#signupForm button[type="submit"]'); // Selecciona el botón de envío dentro del formulario de registro

    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Deshabilitar el botón y cambiar el texto para indicar que el proceso está en curso
        signupButton.disabled = true;
        signupButton.innerText = "Creando cuenta...";

        // Obtener valores de los campos de entrada
        const newUsername = document.getElementById("newUsername").value;
        const newEmail = document.getElementById("newEmail").value;
        const newFaculty = document.getElementById("newFaculty").value;
        const newPhone = document.getElementById("newPhone").value;
        const newAccountNumber = document.getElementById("newAccountNumber").value;
        const newPassword = document.getElementById("newPassword").value;

        try {
            // Enviar datos del formulario al servidor PHP usando fetch
            const response = await fetch('./signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'newUsername': newUsername,
                    'newEmail': newEmail,
                    'newFaculty': newFaculty,
                    'newPhone': newPhone,
                    'newAccountNumber': newAccountNumber,
                    'newPassword': newPassword
                })
            });

            // Obtener la respuesta del servidor
            const data = await response.json();

            // Manejar la respuesta del servidor
            if (data.success) {
                // Registro exitoso
                alert(data.message);
                // Redirigir a todos los usuarios al login
                window.location.href = "./main.html"; // Asegúrate de que esta ruta sea correcta
            } else {
                // Error durante el registro
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Hubo un problema con el registro. Por favor, inténtalo de nuevo.");
        } finally {
            // Habilitar el botón y restaurar el texto original independientemente del resultado
            signupButton.disabled = false;
            signupButton.innerText = "Crear Usuario";
        }
    });

    // Agregar evento de envío para el formulario de inicio de sesión
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener valores de los campos de entrada
        const credential = document.getElementById("loginCredential").value;
        const password = document.getElementById("loginPassword").value;

        try {
            // Enviar datos del formulario al servidor PHP usando fetch
            const response = await fetch('./login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Tipo de contenido
                },
                body: new URLSearchParams({
                    'credential': credential,
                    'password': password
                })
            });

            // Obtener la respuesta del servidor
            const data = await response.json();

            // Manejar la respuesta del servidor
            if (data.success) {
                // Inicio de sesión exitoso
                alert(data.message);
                // Redirigir al usuario según su tipo
                if (data.tipo === 'admin') {
                    window.location.href = "admin/admin.html";
                } else {
                    window.location.href = "perfil/perfil.html";
                }
            } else {
                // Error durante el inicio de sesión
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


// document.addEventListener("DOMContentLoaded", function() {
//     // Función para alternar entre formularios
//     function toggleForms() {
//         document.getElementById("loginContainer").classList.toggle("hidden");
//         document.getElementById("signupContainer").classList.toggle("hidden");
//     }

//     document.getElementById("toggleForm").addEventListener("click", toggleForms);
//     document.getElementById("toggleLoginForm").addEventListener("click", toggleForms);

//     async function submitForm(url, data) {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: new URLSearchParams(data)
//         });
//         return response.json();
//     }

//     // Registro de usuario
//     document.getElementById("signupForm").addEventListener("submit", async function(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const data = Object.fromEntries(formData);
//         const signupButton = event.target.querySelector('button[type="submit"]');

//         signupButton.disabled = true;
//         signupButton.innerText = "Creando cuenta...";

//         try {
//             const result = await submitForm('./signup.php', data);
//             alert(result.message);
//             if (result.success) {
//                 window.location.href = "./main.html";
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert("Hubo un problema con el registro. Por favor, inténtalo de nuevo.");
//         } finally {
//             signupButton.disabled = false;
//             signupButton.innerText = "Crear Usuario";
//         }
//     });

//     // Inicio de sesión
//     document.getElementById("loginForm").addEventListener("submit", async function(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const data = Object.fromEntries(formData);

//         try {
//             const result = await submitForm('login/login.php', data);
//             alert(result.message);
//             if (result.success) {
//                 window.location.href = result.tipo === 'admin' ? "admin/admin.html" : "perfil/perfil.html";
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     });
// });
