<?php
include_once '../conexion.php';

// Obtener el ID del usuario a eliminar
$id_usuario = $_POST['id_usuario'];


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
