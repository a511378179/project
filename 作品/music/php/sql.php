<?php

$host = "localhost:2000";
$dbname = 'userdata';
$user = "root";
$pass = "";
$utf8 = array(PDO::MYSQL_ATTR_INIT_COMMAND => "set names utf8");

$dbh = new PDO("mysql:host=".$host.";dbname=".$dbname,$user,$pass,$utf8);


