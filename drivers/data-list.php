<!DOCTYPE html>
<html><body>
<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/drivers/loginDB.php';

$sql = "SELECT id, username, password, value1, value2, reading_time FROM UserData ORDER BY id ASC";
echo '
<h1>Project 数据库内容</h1>
<p>UserDdata数据库内容：</p>
';
echo '<table cellspacing="5" cellpadding="5">
      <tr> 
        <td>ID</td> 
        <td>username</td> 
        <td>password</td> 
        <td>Value1</td> 
        <td>Value2</td> 
        <td>add date</td> 
      </tr>';
 
if ($result = $conn->query($sql)) {
    while ($row = $result->fetch_assoc()) {
        $row_id = $row["id"];
        $row_Machine = $row["username"];
        $row_Pot = $row["password"];
        $row_Type = $row["value1"];
        $row_value = $row["value2"];
        $row_reading_time = $row["reading_time"];
        // Uncomment to set timezone to - 1 hour (you can change 1 to any number)
        $row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time - 8 hours"));
      
        // Uncomment to set timezone to + 4 hours (you can change 4 to any number)
        //$row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time + 4 hours"));
      
        echo '<tr> 
                <td>' . $row_id . '</td> 
                <td>' . $row_Machine . '</td> 
                <td>' . $row_Pot . '</td> 
                <td>' . $row_Type . '</td> 
                <td>' . $row_value . '</td>
                <td>' . $row_reading_time . '</td> 
              </tr>';
    }
    $result->free();
}

$sql = "SELECT id, Tittle, content, author, reading_time FROM PostData ORDER BY id ASC";

echo '<table cellspacing="5" cellpadding="5">
      <tr> 
        <td>ID</td> 
        <td>Tittle</td>  
        <td>content</td> 
        <td>author</td> 
        <td>post date</td> 
      </tr>';
echo '<p>PostDdata数据库内容：</p>';
if ($result = $conn->query($sql)) {
    while ($row = $result->fetch_assoc()) {
        $row_id = $row["id"];
        $row_Machine = $row["Tittle"];
        $row_Type = $row["content"];
        $row_value = $row["author"];
        $row_reading_time = $row["reading_time"];
        // Uncomment to set timezone to - 1 hour (you can change 1 to any number)
        $row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time - 8 hours"));
      
        // Uncomment to set timezone to + 4 hours (you can change 4 to any number)
        //$row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time + 4 hours"));
      
        echo '<tr> 
                <td>' . $row_id . '</td> 
                <td>' . $row_Machine . '</td>  
                <td>' . $row_Type . '</td> 
                <td>' . $row_value . '</td>
                <td>' . $row_reading_time . '</td> 
              </tr>';
    }
    $result->free();
}


$conn->close();
?> 
</table>
</body>
</html>