<?php
header('Content-Type: application/json');
include_once '../conexion.php';
// Verificar si el usuario ha iniciado sesión
session_start();
if (!isset($_SESSION['loggedInUser'])) {
    // Si el usuario no ha iniciado sesión, devuelve un error y destruye la sesión
    echo json_encode(array('error' => 'Usuario no autenticado'));
    session_destroy();
    exit();
}



// Verificar si se envió el formulario de edición
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se recibieron todos los datos del formulario
    if (isset($_POST['editedEmail']) && isset($_POST['editedFaculty']) && isset($_POST['editedPhone'])) {
        // Obtener valores de los campos de entrada
        $editedEmail = htmlspecialchars($_POST['editedEmail']);
        $editedFaculty = htmlspecialchars($_POST['editedFaculty']);
        $editedPhone = htmlspecialchars($_POST['editedPhone']);

        // Obtener el nombre de usuario de la sesión
        $username = $_SESSION['loggedInUser'];

        // Actualizar los datos del usuario en la base de datos
        $sql = "UPDATE us SET email = '$editedEmail', facultad = '$editedFaculty', telefono = '$editedPhone' WHERE nombre_us = '$username'";
        if ($conn->query($sql) === TRUE) {
            $response = array("success" => true, "message" => "Datos actualizados correctamente");
            echo json_encode($response);
        } else {
            $response = array("success" => false, "error" => "Error al actualizar los datos: " . $conn->error);
            echo json_encode($response);
        }
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
?>
