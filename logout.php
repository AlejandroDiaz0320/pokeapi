<?php
require("includes/db.php");
session_start();
$sesion = new DB;
$sesion->cerrarSesion();
header("location:login.php");
?>