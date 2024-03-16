
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
