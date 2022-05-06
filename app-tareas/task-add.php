<?php
    include('backend.php');

    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $description = $_POST['description'];
        $query = "INSERT into tasks (NAME, DESCRIPTION) VALUES ('$name', '$description') ";

        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Query Error' . mysqli_error($connection));
        }
        echo "Task Add Successfully";

        mysqli_close($connection);
    }
?>