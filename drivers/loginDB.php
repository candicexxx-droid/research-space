<?php
$servername = "localhost";
$dbname = "projecteggert";
$username = "phpmyadmin";
$password = "ZYoung@88";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>