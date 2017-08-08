<?php
    require_once ("sql.php");

    $post = $_POST;
    $name = $post['name'];

    //  查找用户是否存在
	$sql = "select * from user where name='{$name}'";
	$select = $dbh->query($sql);

	$user = array();
	foreach($select as $row){
        $user = $row;
    }

	if(empty($user)){  //不存在的时候将新用户数据存入
        if(!empty($post['pass'])){
            $password = $post['pass'];
            $password = md5($password);
    		$insertsql = "INSERT INTO user (
                        name,password
                    )VALUES(
                        '{$name}','{$password}'
                    )";

            $result = $dbh ->exec($insertsql);

            if($result){
                echo "1";        // 成功时，返回状态码1
            }else{
                echo "0";       // 失败时，返回状态码0
            }
        };
	}else{          //  用户存在时，返回状态码1000
        echo "1000";
    }



