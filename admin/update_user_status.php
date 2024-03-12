<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_p1cyber";
$port = 33065; // Puerto MySQL personalizado

// Obtener los parámetros de la URL
$id_usuario = $_GET['id_usuario'];
$status = $_GET['status'];

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para actualizar el estado del usuario
$sql = "UPDATE us SET activo = $status WHERE id = $id_usuario";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("success" => true, "message" => "Estado del usuario actualizado exitosamente"));
} else {
    echo json_encode(array("success" => false, "error" => "Error al actualizar el estado del usuario: " . $conn->error));
}

// Cerrar la conexión
$conn->close();
?>
