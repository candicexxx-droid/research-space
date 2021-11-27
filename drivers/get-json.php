<?php
header('Access-Control-Allow-Origin: *');//允许跨域调用
$action = $_GET['action'];
$uname = $_GET['uname'];
$passwd = $_GET['passwd'];
$Time = $_GET['Time'];

    function query_sql(){
        $mysqli = new mysqli("localhost", "phpmyadmin", "ZYoung@88", "projecteggert");
        $sqls = func_get_args();
        foreach($sqls as $s){
            $query = $mysqli->query($s);
        }
        $mysqli->close();
        return $query;
    }


    switch($action) {
        case 'login':
            SearchUserData();
            break;
        case 'post':
            SearchPostData();
            break;
        case 'CO2':
            SearchIPSCham();
            break;
        case 'Light':
            SearchIPSCham();
            break;
    }
    
    function SearchUserData(){
        global $uname,$passwd;
        //查询表
        $sql = "SELECT username, password, value1, value2, reading_time FROM UserData WHERE username=";
        $sql .="'";
        $sql .=$uname;
        $sql .="'";
        $sql .=" AND password=";
        $sql .="'";
        $sql .=$passwd;
        $sql .="'";
        $sql .=" ORDER BY id ASC  LIMIT 500";
        $query = query_sql($sql);
        while($row = $query->fetch_assoc()){
            $data[] = $row;
        }
        
        $json = json_encode(array(
            "resultCode"=>200,
            "message"=>"查询成功！",
            "data"=>$data
        ),JSON_UNESCAPED_UNICODE);
        
        //转换成字符串JSON
        echo($json);
    }

    function SearchPostData(){
        //查询表
        $sql = "SELECT Tittle, content, author, reading_time FROM PostData";
        $sql .=" ORDER BY id ASC  LIMIT 500";
        $query = query_sql($sql);
        while($row = $query->fetch_assoc()){
            $data[] = $row;
        }
        
        $json = json_encode(array(
            "resultCode"=>200,
            "message"=>"查询成功！",
            "data"=>$data
        ),JSON_UNESCAPED_UNICODE);
        
        //转换成字符串JSON
        echo($json);
    }
    function SearchIPSCham(){
        global $action,$Machine,$Pot,$Time;
        //查询表
        $sql = "SELECT Machine, Type, value, reading_time FROM IPSChamData WHERE Type=";
        $sql .="'";
        $sql .=$action;
        $sql .="'";
        $sql .=" AND Machine=";
        $sql .="'";
        $sql .=$Machine;
        $sql .="'";
        $sql .=" AND reading_time>";
        $sql .="'";
        $sql .=$Time;
        $sql .="'";
        $sql .=" ORDER BY id ASC  LIMIT 500";

        $query = query_sql($sql);
        while($row = $query->fetch_assoc()){
            $data[] = $row;
        }
        
        $json = json_encode(array(
            "resultCode"=>200,
            "message"=>"查询成功！",
            //"action"=>$action,
            //"Machine"=>$Machine,
            //"Pot"=>$Pot,
            //"Time"=>$Time,
            //"sql"=>$sql,
            "data"=>$data
        ),JSON_UNESCAPED_UNICODE);
        
        //转换成字符串JSON
        echo($json);
    }

    function SearchIPSPot(){
        global $action,$Machine,$Pot,$Time;
        //查询表
        $sql = "SELECT Machine, Type, value, reading_time FROM IPSPotData WHERE Type=";
        $sql .="'";
        $sql .=$action;
        $sql .="'";
        $sql .=" AND Machine=";
        $sql .="'";
        $sql .=$Machine;
        $sql .="'";
        $sql .=" AND Pot=";
        $sql .="'";
        $sql .=$Pot;
        $sql .="'";
        $sql .=" AND reading_time>";
        $sql .="'";
        $sql .=$Time;
        $sql .="'";
        $sql .=" ORDER BY id ASC  LIMIT 500";
        $query = query_sql($sql);
        while($row = $query->fetch_assoc()){
            $data[] = $row;
        }
        
        $json = json_encode(array(
            "resultCode"=>200,
            "message"=>"查询成功！",
            "action"=>$action,
            "Machine"=>$Machine,
            "Pot"=>$Pot,
            "Time"=>$Time,
            "data"=>$data
        ),JSON_UNESCAPED_UNICODE);
        
        //转换成字符串JSON
        echo($json);
    }
    
    


?>