<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_p1cyber";
$port = 33065; // Puerto MySQL personalizado

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar conexión
if ($conn->connect_error) {
    $response = array("success" => false, "error" => "La conexión falló: " . $conn->connect_error);
    echo json_encode($response);
    exit();
}

// Verificar si el usuario ha iniciado sesión
session_start();
if (!isset($_SESSION['loggedInUser'])) {
    // Si el usuario no ha iniciado sesión, devuelve un error
    echo json_encode(array('error' => 'Usuario no autenticado'));
    exit();
}

// Obtener el nombre de usuario de la sesión
$username = $_SESSION['loggedInUser'];

// Consulta para obtener los datos del usuario
$sql = "SELECT * FROM us WHERE nombre_us = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Si se encontraron datos del usuario, devolverlos como respuesta JSON
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    // Si no se encontraron datos del usuario, devuelve un error
    echo json_encode(array('error' => 'No se encontraron datos del usuario'));
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
