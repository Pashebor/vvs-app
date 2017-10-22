<?php
include '../classes/Users.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $users = new Users();
    echo json_encode($users->getUsers());
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $new_user = json_decode(file_get_contents('php://input'), true);
    $user = new Users();
    $response = $user->createUser(array('NAME'=>$new_user['NAME'], 'EMAIL'=>$new_user['EMAIL']));
    echo json_encode($response[0]);
}

