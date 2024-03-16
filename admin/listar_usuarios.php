<?php
include_once '../conexion.php';

// Consulta SQL para seleccionar todos los usuarios
$sql = "SELECT * FROM us ORDER BY created_at DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Array para almacenar los datos de los usuarios
    $users = array();

    // Recorrer los resultados y almacenarlos en el array
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    // Devolver los datos en formato JSON
    echo json_encode($users);
} else {
    // Si no hay usuarios, devolver un array vacío
    echo json_encode(array());
}

// Cerrar la conexión
$conn->close();
?>
