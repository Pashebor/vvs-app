<?php
include './classes/Users.php';

/*$user = new Users();
$response = $user->createUser(array('NAME'=>'test', 'EMAIL'=>'test@test.ru', 'PASSWORD_MD5'=>'hello', 'PASSWORD'=>'hello'));
echo json_encode($response);*/
$users = new Users();
echo json_encode($users->getUsers());
