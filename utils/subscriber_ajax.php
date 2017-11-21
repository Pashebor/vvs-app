<?php
session_start();
include '../classes/Mysql.php';
include '../classes/Users.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode($_POST['report_id']);
        $user = new Users();
        $response = $user->getUserReports($data);
        echo json_encode($response);
        break;
}