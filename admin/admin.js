// document.addEventListener("DOMContentLoaded", function() {
//     // Sample data for testing
//     const registeredUsers = [
//         { username: "user1", email: "user1@example.com", faculty: "Faculty 1", phone: "123-456-7890", accountNumber: "123456789" },
//         { username: "user2", email: "user2@example.com", faculty: "Faculty 2", phone: "234-567-8901", accountNumber: "234567890" },
//         { username: "user3", email: "user3@example.com", faculty: "Faculty 3", phone: "345-678-9012", accountNumber: "345678901" }
//     ];

//     // Get the table body
//     const userTableBody = document.getElementById("userTableBody");

//     // Populate the table with user data
//     registeredUsers.forEach(user => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${user.username}</td>
//             <td>${user.email}</td>
//             <td>${user.faculty}</td>
//             <td>${user.phone}</td>
//             <td>${user.accountNumber}</td>
//             <td>
//                 <button class="action-button accept-button">Accept</button>
//                 <button class="action-button deny-button">Deny</button>
//                 <button class="action-button delete-button">Delete</button>
//             </td>
//         `;
//         userTableBody.appendChild(row);
//     });

//     // Add event listeners to action buttons
//     userTableBody.addEventListener("click", function(event) {
//         const target = event.target;

//         if (target.classList.contains("accept-button")) {
//             // Logic for accepting the user
//             console.log("Accept user");
//         } else if (target.classList.contains("deny-button")) {
//             // Logic for denying the user
//             console.log("Deny user");
//         } else if (target.classList.contains("delete-button")) {
//             // Logic for deleting the user
//             console.log("Delete user");
//         }
//     });
// });


// document.addEventListener("DOMContentLoaded", function() {
//     // Obtener el cuerpo de la tabla de usuarios
//     const userTableBody = document.getElementById("userTableBody");

//     // Realizar una solicitud al servidor para obtener los datos de los usuarios
//     fetch('listar_usuarios.php')
//     .then(response => response.json())
//     .then(users => {
//         // Verificar si se han obtenido datos de usuarios
//         if (users.length > 0) {
//             // Iterar sobre cada usuario y agregarlo a la tabla
//             users.forEach(user => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${user.nombre_us}</td>
//                     <td>${user.email}</td>
//                     <td>${user.facultad}</td>
//                     <td>${user.telefono}</td>
//                     <td>${user.num_cuenta}</td>
//                     <td>
//                         <button class="action-button accept-button">Accept</button>
//                         <button class="action-button deny-button">Deny</button>
//                         <button class="action-button delete-button">Delete</button>
//                     </td>
//                 `;
//                 userTableBody.appendChild(row);
//             });
//         } else {
//             // Si no hay usuarios, mostrar un mensaje o tomar otra acción
//             console.log("No hay usuarios para mostrar");
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });


// document.addEventListener("DOMContentLoaded", function() {
//     // Obtener el cuerpo de la tabla de usuarios
//     const userTableBody = document.getElementById("userTableBody");

//     // Realizar una solicitud al servidor para obtener los datos de los usuarios
//     fetch('listar_usuarios.php')
//     .then(response => response.json())
//     .then(users => {
//         // Verificar si se han obtenido datos de usuarios
//         if (users.length > 0) {
//             // Iterar sobre cada usuario y agregarlo a la tabla
//             users.forEach(user => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${user.nombre_us}</td>
//                     <td>${user.email}</td>
//                     <td>${user.facultad}</td>
//                     <td>${user.telefono}</td>
//                     <td>${user.num_cuenta}</td>
//                     <td>
//                         <button class="action-button accept-button">Accept</button>
//                         <button class="action-button deny-button">Deny</button>
//                         <button class="action-button delete-button" data-id="${user.id}">Delete</button>
//                     </td>
//                 `;
//                 userTableBody.appendChild(row);
//             });
//         } else {
//             // Si no hay usuarios, mostrar un mensaje o tomar otra acción
//             console.log("No hay usuarios para mostrar");
//         }
//     })
//     .catch(error => console.error('Error:', error));

//     // Agregar event listener para los botones de eliminar
//     userTableBody.addEventListener("click", function(event) {
//         const target = event.target;
//         if (target.classList.contains("delete-button")) {
//             const id_usuario = target.dataset.id;
//             // Realizar una solicitud al servidor para eliminar el usuario
//             fetch('delete_user.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: new URLSearchParams({
//                     'id_usuario': id_usuario
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     console.log(data.message);
//                     // Eliminar la fila de la tabla
//                     target.closest('tr').remove();
//                 } else {
//                     console.error(data.error);
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
    // Obtener el cuerpo de la tabla de usuarios
    const userTableBody = document.getElementById("userTableBody");

    // Realizar una solicitud al servidor para obtener los datos de los usuarios
    fetch('listar_usuarios.php')
    .then(response => response.json())
    .then(users => {
        // Verificar si se han obtenido datos de usuarios
        if (users.length > 0) {
            // Iterar sobre cada usuario y agregarlo a la tabla
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.nombre_us}</td>
                    <td>${user.email}</td>
                    <td>${user.facultad}</td>
                    <td>${user.telefono}</td>
                    <td>${user.num_cuenta}</td>
                    <td>
                        <button class="action-button accept-button" data-id="${user.id}">Accept</button>
                        <button class="action-button deny-button" data-id="${user.id}">Deny</button>
                        <button class="action-button delete-button" data-id="${user.id}">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        } else {
            // Si no hay usuarios, mostrar un mensaje o tomar otra acción
            console.log("No hay usuarios para mostrar");
        }
    })
    .catch(error => console.error('Error:', error));

    // Agregar event listener para los botones de aceptar, denegar y eliminar
    userTableBody.addEventListener("click", function(event) {
        const target = event.target;
        const id_usuario = target.dataset.id;

        if (target.classList.contains("accept-button")) {
            updateUserStatus(id_usuario, 1); // Aceptar usuario (activar)
        } else if (target.classList.contains("deny-button")) {
            updateUserStatus(id_usuario, 0); // Denegar usuario (bloquear)
        } else if (target.classList.contains("delete-button")) {
            deleteUser(id_usuario); // Eliminar usuario
        }
    });

    // Función para actualizar el estado del usuario (aceptar o denegar)
    function updateUserStatus(id_usuario, status) {
        fetch(`update_user_status.php?id_usuario=${id_usuario}&status=${status}`, {
            method: 'PATCH'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message);
                // Actualizar visualmente el estado del usuario si es necesario
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Función para eliminar un usuario
    function deleteUser(id_usuario) {
        fetch('delete_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'id_usuario': id_usuario
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message);
                // Eliminar la fila de la tabla
                //target.closest('tr').remove(); // Eliminar visualmente la fila si es necesario
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
