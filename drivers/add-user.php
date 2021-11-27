<?php
header('Access-Control-Allow-Origin: *');//允许跨域调用-for debug
$api_key_value = "eggertisgod";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
    if($api_key == $api_key_value) {
        $nusername = test_input($_POST["username"]);
        $npassword = test_input($_POST["password"]);
        $value1 = test_input($_POST["value1"]);
        $value2 = test_input($_POST["value2"]);
        // Create connection
        require_once $_SERVER['DOCUMENT_ROOT'].'/drivers/loginDB.php';
        $sql = "INSERT INTO UserData (username, password, value1, value2)
        VALUES ('" . $nusername . "', '" . $npassword . "', '" . $value1 . "', '" . $value2 . "')";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } 
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();
    }
    else {
        echo "Wrong API Key provided.";
    }

}
else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}