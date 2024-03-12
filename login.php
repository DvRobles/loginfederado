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

// Verificar si se envió el formulario de inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se recibieron todos los datos del formulario
    if (isset($_POST['credential']) && isset($_POST['password'])) {
        // Obtener valores de los campos de entrada
        $credential = htmlspecialchars($_POST['credential']);
        $password = $_POST['password']; // La contraseña ya está hasheada

        // Buscar al usuario en la base de datos por correo electrónico o número de cuenta
        $stmt = $conn->prepare("SELECT * FROM us WHERE email = ? OR num_cuenta = ?");
        $stmt->bind_param("ss", $credential, $credential);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Usuario encontrado
            $user = $result->fetch_assoc();
            // Verificar si la cuenta está bloqueada
            if ($user['activo'] == 0) {
                // La cuenta está bloqueada
                $response = array("success" => false, "error" => "Su cuenta está bloqueada. Por favor, póngase en contacto con el administrador.");
                echo json_encode($response);
            } else {
                // La cuenta está activa, verificar la contraseña hasheada
                if (password_verify($password, $user['contra'])) {
                    $response = array("success" => true, "message" => "Inicio de sesión exitoso");
                    session_start();
                    $_SESSION['loggedInUser'] = $user['nombre_us']; // o $user['id'], dependiendo de tu lógica de sesión

                    echo json_encode($response);
                } else {
                    $response = array("success" => false, "error" => "Contraseña incorrecta");
                    echo json_encode($response);
                }
            }
        } else {
            $response = array("success" => false, "error" => "Usuario no encontrado");
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
?>
