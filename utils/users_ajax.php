<?php
include '../classes/Mysql.php';
include '../classes/Users.php';
include '../classes/Reports.php';


switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $users = new Users();
        echo json_encode($users->getUsers());
        break;
    case 'PUT':
        $new_user = json_decode(file_get_contents('php://input'), true);
        $user = new Users();
        $response = $user->createUser(array('NAME'=>$new_user['NAME'], 'EMAIL'=>$new_user['EMAIL']));
        echo json_encode($response[0]);
        break;
    case 'POST':
        $report = new Reports();
        $fileName = $_POST['file_name'];
        $file_one = $_FILES['file_one'];
        /*$fileType_one = $_FILES['file_one']['type'];*/
       /* $fileType_two = $_FILES['file_two']['type'];
        $fileType_three = $_FILES['file_three']['type'];
        $fileType_four = $_FILES['file_four']['type'];
        $fileType_five = $_FILES['file_five']['type'];*/
        /*$fileContent_one = file_get_contents($_FILES['file_one']['tmp_name']);*/
       /* $fileContent_two = file_get_contents($_FILES['file_two']['tmp_name']);
        $fileContent_three = file_get_contents($_FILES['file_three']['tmp_name']);
        $fileContent_four = file_get_contents($_FILES['file_four']['tmp_name']);
        $fileContent_five = file_get_contents($_FILES['file_five']['tmp_name']);*/
        /*$dataUrl_one = 'data:' . $fileType_one . ';base64,' . base64_encode($fileContent_one);*/
        /*$dataUrl_two = 'data:' . $fileType_two . ';base64,' . base64_encode($fileContent_two);
        $dataUrl_three = 'data:' . $fileType_three . ';base64,' . base64_encode($fileContent_three);
        $dataUrl_four = 'data:' . $fileType_four . ';base64,' . base64_encode($fileContent_four);
        $dataUrl_five = 'data:' . $fileType_five . ';base64,' . base64_encode($fileContent_five);*/
        /*$json = json_encode(array(
            'name' => $fileName,
            'type' => $fileType_one,
            'dataUrl_one' => $dataUrl_one,
            'dataUrl_two' => $dataUrl_two,
            'dataUrl_three' => $dataUrl_three,
            'dataUrl_four' => $dataUrl_four,
            'dataUrl_five' => $dataUrl_five,
        ));*/

        $json = ['list1' => $report->insertAReport($fileName ,$report->createReport($file_one, $fileName, 'foreign_rating'))];
        echo json_encode($json);
        break;
}



