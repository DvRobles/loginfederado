<?php
session_start();
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include_once '../conexion.php';

if (!isset($_SESSION['loggedInUser'])) {
    header('Location: ../index.php');
    exit;
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
