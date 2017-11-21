<?php

class Users{
    
    private function randomPassword() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array();
        $alphaLength = strlen($alphabet) - 1;
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass);
    }
    
    function getUsers() {
        $sql = new Mysql();
        $data = [];
        if ($sql->dbConnect()) {
            $data = $sql->selectAll('users');
            $sql->dbDisconnect();
        }
        return mysqli_fetch_all($data, MYSQLI_ASSOC);
    }
    
    function createUser($values) {
        $user = [];
        $sql = new Mysql();
        $values['PASSWORD'] = $this->randomPassword();
        $values['PASSWORD_MD5'] = $values['PASSWORD'];
        if ($sql->dbConnect()) {
            $sql->insertInto('users', $values);
            $user = $sql->selectWhere('users', 'EMAIL', '=' ,$values['EMAIL'], 'char');
            $sql->dbDisconnect();
        }
        return mysqli_fetch_all($user, MYSQLI_ASSOC);
    }
    
    function deleteUser($values) {
        $sql = new Mysql();
        if ($sql->dbConnect()) {
            $sql->delete('users', $values['ID']);
            $users = $sql->selectAll('users');
            $sql->dbDisconnect();
            return mysqli_fetch_all($users, MYSQLI_ASSOC);
        } else {
            return false;
        }
    }

    function addReportToUser($data, $type) {
        $sql = new Mysql();
        if ($sql->dbConnect()) {
            $sql->updateUsers($data, $type);
            $users = $sql->selectAll('users');
            $sql->dbDisconnect();
            return mysqli_fetch_all($users, MYSQLI_ASSOC);
        } else {
            return false;
        }
    }

    function getUserReports($report_id) {
        $sql = new Mysql();
        if($sql->dbConnect()) {
            $table_row = $sql->selectWhere('reports', 'id', '=', $report_id, 'char');
            $table_name= $table_row->fetch_object()->assocName;
            $customers = $sql->selectAll($table_name.'_r_customers');
            $manufacturers = $sql->selectAll($table_name.'_r_manufact');
            $provider = $sql->selectAll($table_name.'_r_provider');
            $exporters = $sql->selectAll($table_name.'_r_exporters');
            $preferences = $sql->selectAll($table_name.'_c_preferences');
            $sql->dbDisconnect();
            $response = array('one'=>mysqli_fetch_all($customers, MYSQLI_ASSOC),
                'two'=>mysqli_fetch_all($manufacturers, MYSQLI_ASSOC),
                'three'=>mysqli_fetch_all($provider, MYSQLI_ASSOC),
                'four'=>mysqli_fetch_all($exporters, MYSQLI_ASSOC),
                'five'=>mysqli_fetch_all($preferences, MYSQLI_ASSOC));
            return $response;
        } else {
            return ['callback'=>'error'];
        }
    }
}