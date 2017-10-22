<?php
include 'DbConfig.php';

class Mysql {
    private $connectionString;
    private $dataSet;
    private $sqlQuery;


    function dbConnect() {
        $this -> dataSet = new Dbconfig();
        $this -> connectionString = mysqli_connect(
            $this->dataSet->Dbconfig()['SERVER_NAME'],
            $this->dataSet->Dbconfig()['USER_NAME'],
            $this->dataSet->Dbconfig()['PASS_CODE'],
            $this->dataSet->Dbconfig()['DB_NAME']);
        return $this -> connectionString;
    }

    function dbDisconnect() {
        $this -> connectionString = NULL;
        $this -> sqlQuery = NULL;
        $this -> dataSet = NULL;
    }

    function checkAdmin($adminData) {
        $this -> sqlQuery = "SELECT * FROM admin WHERE NAME='".$adminData['name']."' AND PASSWORD = md5('".$adminData['password']."')";
        $data = mysqli_query($this -> connectionString, $this -> sqlQuery);
        $num_row = mysqli_num_rows($data);
        $data_resp = [];
        if ($num_row == 1) {
            foreach ($data as $key => $value) {
                    $data_resp = array('name' => $value['NAME'], 'email' => $value['EMAIL'], 'password'=>$value['PASSWORD']);
            }
            return $data_resp;
        } else {
            return null;
        }
    }

    function checkUser($userData) {
        $this -> sqlQuery = "SELECT * FROM users WHERE EMAIL='".$userData['name']."' AND PASSWORD_MD5 = md5('".$userData['password']."')";
        $data = mysqli_query($this -> connectionString, $this -> sqlQuery);
        $num_row = mysqli_num_rows($data);
        $data_resp = [];
        if ($num_row == 1) {
            foreach ($data as $key => $value) {
                $data_resp = array('name' => $value['NAME'], 'email' => $value['EMAIL'], 'password'=>$value['PASSWORD']);
            }
            return $data_resp;
        } else {
            return null;
        }
    }

    function selectAll($tableName)  {
        $this -> sqlQuery = 'SELECT * FROM '.$tableName;
        $data = mysqli_query($this -> connectionString, $this -> sqlQuery);
        return $data;
    }

    function selectWhere($tableName,$rowName,$operator,$value,$valueType)   {
        $this -> sqlQuery = 'SELECT * FROM '.$tableName.' WHERE '.$rowName.' '.$operator.' ';
        if($valueType == 'int') {
            $this -> sqlQuery .= $value;
        }
        else if($valueType == 'char')   {
            $this -> sqlQuery .= "'".$value."'";
        }
        $this -> dataSet = mysqli_query($this -> connectionString, $this -> sqlQuery);
        $this -> sqlQuery = NULL;
        return $this -> dataSet;
        #return $this -> sqlQuery;
    }

    private function set_columns($columns) {
        $i = 0;
        $string = '';
        foreach ($columns as $column) {
            $i++;
            if ($i == 1) {
                $string .= $column;
            } else {
                $string .= ', '.$column;
            }
        }
        return $string;
    }

    private function set_values($values) {
        $i = 0;
        $string = '';

        foreach($values as $key => $value) {
            $i++;
            if ($i == 1) {
                ($key == 'PASSWORD_MD5') ? $string .= "'".md5($value)."'": $string .= "'".$value."'";
            } else {
                ($key == 'PASSWORD_MD5') ? $string .= ', '."'".md5($value)."'" : $string .= ', '."'".$value."'";
            }
        }
        return $string;
    }

    function insertInto($tableName,$values) {
        $columns = array_keys($values);
        $this -> sqlQuery = 'INSERT INTO '.$tableName.' (';
        $this -> sqlQuery .= $this -> set_columns($columns);
        $this -> sqlQuery .= ')';
        $this -> sqlQuery .= ' VALUES (';
        $this -> sqlQuery .= $this -> set_values($values);
        $this ->sqlQuery .= ')';

        mysqli_query($this -> connectionString, $this -> sqlQuery);
        return $this -> sqlQuery;
        #$this -> sqlQuery = NULL;
    }

    function selectFreeRun($query)  {
        $this -> dataSet = mysql_query($query,$this -> connectionString);
        return $this -> dataSet;
    }

    function freeRun($query)    {
        return mysql_query($query,$this -> connectionString);
    }
}