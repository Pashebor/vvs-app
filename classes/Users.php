<?php
include 'Mysql.php';
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
}