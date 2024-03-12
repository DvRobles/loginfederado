<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_p1cyber";
$port = 33065; // Puerto MySQL personalizado

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para seleccionar todos los usuarios
$sql = "SELECT * FROM us"; // "users" es el nombre de tu tabla de usuarios, asegúrate de que sea el correcto

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
