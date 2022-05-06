
<?php
    $servidor = 'localhost';
    $usuario = 'root';
    $datebase = 'task-app';
    $password = '';

    $connection = mysqli_connect($servidor , $usuario , $password , $datebase );

    // if($connection){
    //     echo "La conección funciona";
    // }else{
    //     echo "Error al conectar";
    // }
?>