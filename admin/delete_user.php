<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_p1cyber";
$port = 33065; // Puerto MySQL personalizado

// Obtener el ID del usuario a eliminar
$id_usuario = $_POST['id_usuario'];

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para eliminar el usuario
$sql = "DELETE FROM us WHERE id = $id_usuario";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("success" => true, "message" => "Usuario eliminado exitosamente"));
} else {
    echo json_encode(array("success" => false, "error" => "Error al eliminar usuario: " . $conn->error));
}

// Cerrar la conexión
$conn->close();
?>
