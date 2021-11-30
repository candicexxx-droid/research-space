<?php
header('Access-Control-Allow-Origin: *');//允许跨域调用-for debug
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
$api_key_value = "eggertisgod";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
    if($api_key == $api_key_value) {
        $Tittle = test_input($_POST["Tittle"]);
        $content = test_input($_POST["content"]);
        $author = test_input($_POST["author"]);
        $department = test_input($_POST["department"]);
        // Create connection
        require_once $_SERVER['DOCUMENT_ROOT'].'/drivers/loginDB.php';
        $sql = "INSERT INTO PostData (Tittle, content, author, department)
        VALUES ('" . $Tittle . "', '" . $content . "', '" . $author . "', '" .$department."')";
        echo "$sql";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } 
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();
    }
    else {
        echo "Wrong API Key provided."."The Api Key you provided:".test_input($_POST["api_key"])."The Tittle you provided:".test_input($_POST["Tittle"])."The content you provided:".test_input($_POST["content"]);
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