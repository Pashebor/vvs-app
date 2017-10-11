<?php
class Dbconfig {
    public function Dbconfig() {
        $serverName = 'localhost';
        $userName = 'root';
        $passCode = 'ltvmzyjd';
        $dbName = 'vvs-test';

        return array('SERVER_NAME'=>$serverName, 'USER_NAME'=>$userName, 'PASS_CODE'=>$passCode, 'DB_NAME'=>$dbName);
    }
}