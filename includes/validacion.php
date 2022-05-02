<?php
require("db.php");

$usuario = $_POST['email'];
$pass = $_POST['password'];
session_start();

$conex = new DB();
$pp = $conex->loginValidacion($usuario, $pass);
$filas=mysqli_num_rows($pp);
if($filas){
    $_SESSION['usuario']=$conex->usuario($usuario);
    header("location:../index.php");
}else{
    header("location:../login.php?error=true");
}