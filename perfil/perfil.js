// document.addEventListener("DOMContentLoaded", function() {
//     // Obtener el nombre de usuario de la sesión
//     const username = sessionStorage.getItem("loggedInUser");

//     // Mostrar el nombre de usuario en la bienvenida
//     const welcomeText = document.getElementById("welcomeText");
//     welcomeText.textContent = `Welcome, ${username}!`;

//     // Obtener información del usuario desde el almacenamiento local
//     const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
//     const currentUser = registeredUsers.find(user => user.username === username);

//     if (currentUser) {
//         // Construir la tarjeta de información del usuario
//         const userCard = document.getElementById("userCard");
//         const userCardHTML = `
//             <div class="card">
//                 <h2>Nombre de usuario: ${currentUser.username}</h2>
//                 <p>Correo electrónico: ${currentUser.email}</p>
//                 <p>Facultad: ${currentUser.faculty}</p>
//                 <p>Teléfono: ${currentUser.phone}</p>
//                 <button class="edit-button">Editar <i class="fas fa-pencil-alt"></i></button>
//             </div>
//         `;
//         userCard.innerHTML = userCardHTML;

//         // Agregar evento de click al botón de editar
//         const editButton = document.querySelector(".edit-button");
//         editButton.addEventListener("click", function() {
//             // Abrir el modal de edición
//             const modal = document.getElementById("editModal");
//             modal.style.display = "block";

//             // Rellenar los campos del formulario con los datos del usuario actual
//             document.getElementById("editEmail").value = currentUser.email;
//             document.getElementById("editFaculty").value = currentUser.faculty;
//             document.getElementById("editPhone").value = currentUser.phone;
//         });

//         // Obtener el botón de cerrar del modal
//         const closeButton = document.querySelector(".close");

//         // Cerrar el modal al hacer clic en el botón de cerrar (x)
//         closeButton.addEventListener("click", function() {
//             const modal = document.getElementById("editModal");
//             modal.style.display = "none";
//         });

//         // Cerrar el modal al hacer clic fuera del modal
//         window.onclick = function(event) {
//             const modal = document.getElementById("editModal");
//             if (event.target === modal) {
//                 modal.style.display = "none";
//             }
//         };

//         // Agregar evento de envío para el formulario de edición
//         const editForm = document.getElementById("editForm");
//         editForm.addEventListener("submit", function(event) {
//             event.preventDefault(); // Evitar el envío del formulario por defecto

//             // Obtener los nuevos valores del formulario
//             const newEmail = document.getElementById("editEmail").value;
//             const newFaculty = document.getElementById("editFaculty").value;
//             const newPhone = document.getElementById("editPhone").value;

//             // Actualizar los datos del usuario en el localStorage
//             currentUser.email = newEmail;
//             currentUser.faculty = newFaculty;
//             currentUser.phone = newPhone;

//             // Actualizar la información en el localStorage
//             localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

//             // Cerrar el modal después de guardar los cambios
//             const modal = document.getElementById("editModal");
//             modal.style.display = "none";

//             // Mostrar un mensaje de éxito
//             alert("¡Datos actualizados con éxito!");
//         });
//     } else {
//         // Si no se encuentra el usuario, redirigir a la página de inicio de sesión
//         alert("Usuario no encontrado. Por favor, inicia sesión.");
//         window.location.href = "../main.html";
//     }
// });


//!funcional
document.addEventListener("DOMContentLoaded", function() {
    // Realizar una solicitud al servidor para obtener los datos del usuario
    fetch('perfil.php')
    .then(response => response.json())
    .then(data => {
        // Verificar si hay un error en la respuesta
        if (data.error) {
            console.error('Error:', data.error);
            return;
        }

        // Obtener el nombre de usuario del objeto de datos
        const username = data.nombre_us;

        // Mostrar el nombre de usuario en la bienvenida
        const welcomeText = document.getElementById("welcomeText");
        welcomeText.textContent = `Welcome, ${username}!`;

        // Construir la tarjeta de información del usuario con los datos recibidos
        const userCard = document.getElementById("userCard");
        const userCardHTML = `
            <div class="card">
                <h2>Nombre de usuario: ${username}</h2>
                <p>Correo electrónico: ${data.email}</p>
                <p>Facultad: ${data.facultad}</p>
                <p>Teléfono: ${data.telefono}</p>
                <button class="edit-button">Editar <i class="fas fa-pencil-alt"></i></button>
            </div>
        `;
        userCard.innerHTML = userCardHTML;

        // Agregar evento de click al botón de editar
        const editButton = document.querySelector(".edit-button");
        editButton.addEventListener("click", function() {
            // Abrir el modal de edición
            const modal = document.getElementById("editModal");
            modal.style.display = "block";

            // Rellenar los campos del formulario con los datos del usuario actual
            document.getElementById("editEmail").value = data.email;
            document.getElementById("editFaculty").value = data.facultad;
            document.getElementById("editPhone").value = data.telefono;
        });

        // Obtener el botón de cerrar del modal
        const closeButton = document.querySelector(".close");

        // Cerrar el modal al hacer clic en el botón de cerrar (x)
        closeButton.addEventListener("click", function() {
            const modal = document.getElementById("editModal");
            modal.style.display = "none";
        });

        // Cerrar el modal al hacer clic fuera del modal
        window.onclick = function(event) {
            const modal = document.getElementById("editModal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        // Agregar evento de envío para el formulario de edición
        const editForm = document.getElementById("editForm");
        editForm.addEventListener("submit", async function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            // Obtener los nuevos valores del formulario
            const editedEmail = document.getElementById("editEmail").value;
            const editedFaculty = document.getElementById("editFaculty").value;
            const editedPhone = document.getElementById("editPhone").value;

            try {
                // Enviar datos del formulario al servidor PHP usando fetch
                const response = await fetch('editperfil.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Tipo de contenido
                    },
                    body: new URLSearchParams({
                        'editedEmail': editedEmail,
                        'editedFaculty': editedFaculty,
                        'editedPhone': editedPhone
                    })
                });

                // Obtener la respuesta del servidor
                const responseData = await response.json();

                // Manejar la respuesta del servidor
                if (responseData.success) {
                    // Datos actualizados exitosamente
                    alert(responseData.message);
                    // Cerrar el modal después de guardar los cambios
                    const modal = document.getElementById("editModal");
                    modal.style.display = "none";
                } else {
                    // Error al actualizar los datos
                    alert(responseData.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });

        // Resto del código para manejar la edición del perfil...
    })
    .catch(error => console.error('Error:', error));
});
