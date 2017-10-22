<?php
class Dbconfig {
    public function Dbconfig() {
        $serverName = 'localhost';
        $userName = 'root';
        $passCode = 'ltvmzyjd90';
        $dbName = 'test-vvs';

        return array('SERVER_NAME'=>$serverName, 'USER_NAME'=>$userName, 'PASS_CODE'=>$passCode, 'DB_NAME'=>$dbName);
    }
}