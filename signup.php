<?php
header('Content-Type: application/json');

include_once 'conexion.php';

// Verificar si se envió el formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se recibieron todos los datos del formulario
    if (isset($_POST['newUsername']) && isset($_POST['newEmail']) && isset($_POST['newFaculty']) && isset($_POST['newPhone']) && isset($_POST['newAccountNumber']) && isset($_POST['newPassword'])) {
        // Obtener valores de los campos de entrada
        $us = htmlspecialchars($_POST['newUsername']);
        $email = htmlspecialchars($_POST['newEmail']);
        $faculty = htmlspecialchars($_POST['newFaculty']);
        $phone = htmlspecialchars($_POST['newPhone']);
        $accountNumber = htmlspecialchars($_POST['newAccountNumber']);
        $password = password_hash($_POST['newPassword'], PASSWORD_BCRYPT); // Hashear la contraseña

        // Generar UUID para el ID del usuario
        $uuid = generateSecureUUID();

        // Insertar usuario en la base de datos
        $stmt = $conn->prepare("INSERT INTO us (id, nombre_us, email, facultad, telefono, num_cuenta, contra) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issssss", $uuid, $us, $email, $faculty, $phone, $accountNumber, $password);

        if ($stmt->execute() === TRUE) {
            // Si el registro fue exitoso, redirigir al usuario a la página de perfil
            session_start();
            $_SESSION['loggedInUser'] = $us; // Establecer la sesión del usuario recién registrado
            // $response = array("success" => true, "message" => "Usuario registrado correctamente", "redirect" => "perfil.php");
            $response = array("success" => true, "message" => "Tu cuenta está en proceso de activación. El administrador aceptará tu cuenta lo antes posible si cumples con los requerimientos.", "redirect" => "main.html");

            echo json_encode($response);
        } else {
            $response = array("success" => false, "error" => "Error al registrar el usuario: " . $conn->error);
            echo json_encode($response);
        }

        $stmt->close();
    } else {
        $response = array("success" => false, "error" => "No se recibieron todos los datos del formulario");
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "error" => "No se recibió una solicitud POST");
    echo json_encode($response);
}

// Cerrar conexión a la base de datos
$conn->close();

// Función para generar un UUID seguro
function generateSecureUUID() {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
?>
