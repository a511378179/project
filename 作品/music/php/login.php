<?php
    require_once ("sql.php");

    $post = $_POST;
    $name = $post['name'];
    $password = $post['pass'];
    $password = md5($password);

    //  查找用户是否存在
	$sql = "select * from user where name='{$name}'";
	$select = $dbh->query($sql);

	$user = array();
	foreach($select as $row){
        $user = $row;
    }

	if(empty($user)){  //不存在的时候将新用户数据存入
        echo 1000;         //该用户不存在。
	}else{              //  用户存在时，返回状态码1000
       if($password==$user["password"]){
           echo 1;      //登陆成功
       }else{
           echo 0;      //密码错误
       }
    }



