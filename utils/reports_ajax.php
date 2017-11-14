<?php
include '../classes/Mysql.php';
include '../classes/Reports.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $reports = new Reports();
        echo json_encode($reports->getReports());
        break;
    case 'POST':
        $report = new Reports();
        $fileName = $_POST['file_name'];
        $file_one = $_FILES['file_one'];
        $file_two = $_FILES['file_two'];
        $file_three = $_FILES['file_three'];
        $file_four = $_FILES['file_four'];
        $file_five = $_FILES['file_five'];
        $report->createReport($file_one, $fileName, 'r_customers');
        $report->createReport($file_two, $fileName, 'r_manufact');
        $report->createReport($file_three, $fileName, 'r_provider');
        $report->createReport($file_four, $fileName, 'r_exporters');
        $json = $report->insertAReport($fileName ,$report->createReport($file_five, $fileName, 'c_preferences'));
        echo json_encode($json[0]);
        break;
    case 'DELETE':
        $report_to_delete = json_decode(file_get_contents('php://input'), true);
        $report = new Reports();
        $response = $report->deleteReport($report_to_delete);
        if ($response) {
            echo json_encode($response);
        } else {
            echo json_encode('error');
        }
        break;
        
}