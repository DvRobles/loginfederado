<?php
include_once '../conexion.php';

// Obtener los parámetros de la URL
$id_usuario = $_GET['id_usuario'];
$status = $_GET['status'];


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
