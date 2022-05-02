<?php

class DB{
    private $host;
    private $db;
    private $user;
    private $password;
    private $charset;

    public function __construct(){
        $this->host     = 'localhost';
        $this->db       = 'pokeapi_db';
        $this->user     = 'root';
        $this->password = "";
        $this->charset  = 'utf8mb4';
    }

    function connect(){
        $conexion=mysqli_connect($this->host,$this->user,$this->password,$this->db);
        return $conexion;
    }

    function loginValidacion($correo, $pass){
        $conex = $this->connect();
        $query = "SELECT * FROM tb_usuarios WHERE correo = '$correo' AND pass = '$pass'";
        $row = mysqli_query($conex, $query);
        return $row;
    }

    function usuario($correo){
        $conex = $this->connect();
        $query = "SELECT nombre FROM tb_usuarios WHERE correo = '$correo'";
        $row = mysqli_query($conex, $query);
        $nombre = '';
        while ($obj = $row->fetch_object()) {
            $nombre = $obj->nombre;
        }
        return $nombre;
    }

    public function cerrarSesion(){
        session_unset();
        session_destroy();
    }
}
?>