<?php
$host = "localhost";
$username = "root";
$password = "";
$db_name = "goqii_test";

$conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>