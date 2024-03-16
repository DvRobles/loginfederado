<?php

session_start();

// Si el usuario está logueado, redirige a una página de bienvenida o dashboard.
if (isset($_SESSION['loggedInUser'])) {
    header("Location: perfil/perfil.php"); // Asumiendo que "bienvenida.php" es tu dashboard o página de inicio para usuarios logueados.
    exit;
} else {
    // Si no está logueado, muestra el contenido de main.html (o el formulario de inicio de sesión).
    include("main.html");
}
?>
