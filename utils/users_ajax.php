<?php
session_start();
include '../classes/Mysql.php';
include '../classes/Users.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $users = new Users();
        if (isset($_SESSION['USER'])) {
            echo json_encode($users->getUsers());
        } else {
            echo json_encode(['callback'=>'error']);
        }
        break;
    case 'PUT':
        $new_user = json_decode(file_get_contents('php://input'), true);
        $user = new Users();
        $response = $user->createUser(array('NAME'=>$new_user['NAME'], 'EMAIL'=>$new_user['EMAIL']));
        echo json_encode($response[0]);
        break;
    case 'POST':
        $logout = $_POST['logout'];
        $is_popup_forms = $_POST['popupForms'];
        if (!$logout) {
            if(!$is_popup_forms) {
                if (isset($_SESSION['USER'])) {
                    $current_user = ['type' => $_SESSION['USER'], 'name' => $_SESSION['NAME'], 'email' => $_SESSION['EMAIL']];
                    echo json_encode($current_user);
                }
            } else {
                $popup_forms = $_POST;
                $report_owner_data = [
                    'reportId'=>$popup_forms['reportId'], 'reportAssocName'=>$popup_forms['reportAssocName'],
                    'reportName'=>$popup_forms['reportName'], 'userId'=>$popup_forms['userId'], 'userName'=>$popup_forms['userName']
                ];
                $user = new Users();
                $response = $user->addReportToUser($report_owner_data, 'add');
                echo json_encode($response);
            }
        } else {
            session_destroy();
            echo json_encode(['callback'=>true]);
        }
        break;
    case 'DELETE':
        $delete_user = json_decode(file_get_contents('php://input'), true);
        if(!$delete_user['userId']) {
            $user = new Users();
            $response = $user->deleteUser($delete_user);
            if ($response) {
                echo json_encode($response);
            } else {
                echo json_encode('error');
            }
        } else {
            $user = new Users();
            $response = $user->addReportToUser($delete_user, 'delete');
            echo json_encode($response);
        }
        break;
}



