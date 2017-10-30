<?php
include 'DbConfig.php';
date_default_timezone_set('Europe/Moscow');
ini_set('max_execution_time', 1000);
mb_internal_encoding("UTF-8");
include('PHPExcel/IOFactory.php');

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
        mysqli_set_charset($this->connectionString,"utf8");
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
        mysqli_set_charset($this->connectionString,"utf8");
        $this -> dataSet = mysqli_query($this -> connectionString, $this -> sqlQuery);
        $this -> sqlQuery = NULL;
        return $this -> dataSet;
        #return $this -> sqlQuery;
    }
    
    function createListOne($name) {
        $this->sqlQuery = 'CREATE TABLE '.$name.' (id INT(11) AUTO_INCREMENT NOT NULL,';
        $this->sqlQuery .= 'firm_name VARCHAR (120), recipient_address VARCHAR (250),recipient_country VARCHAR (120),';
        $this->sqlQuery .= 'over_vol_purchases FLOAT, market_share FLOAT, vol_purchases_m FLOAT,';
        $this->sqlQuery .= 'vol_purchases_kg FLOAT, count_purchases INTEGER, PRIMARY KEY (id)';
        $this->sqlQuery .= ') ENGINE = InnoDB DEFAULT CHARSET=utf8';
        mysqli_set_charset($this->connectionString,"utf8");
        mysqli_query($this->connectionString, $this->sqlQuery);

        $this->sqlQuery = NULL;
        $input_file_name = '../reports/'.$name.'.xlsx';
        $excel_data = array();
        try
        {
            $input_file_type = PHPExcel_IOFactory::identify($input_file_name);
            $objReader = PHPExcel_IOFactory::createReader($input_file_type);
            $objPHPExcel = $objReader->load($input_file_name);
        }
        catch(Exception $e)
        {
            die('Error loading file "'.pathinfo($input_file_name,PATHINFO_BASENAME).'": '.$e->getMessage());
        }

        //  Get worksheet dimensions
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        for ($row = 2; $row <= $highestRow; $row++)
        {
            //  Read a row of data into an array
            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            //  Insert row data array into your database of choice here
            $this->sqlQuery= "INSERT INTO ".$name." (firm_name, recipient_address, recipient_country, over_vol_purchases, market_share, vol_purchases_m, vol_purchases_kg, count_purchases)
			VALUES ('".$rowData[0][1]."', '".$rowData[0][2]."', '".$rowData[0][3]."', '".$rowData[0][4]."', '".($rowData[0][5] * 100)."', '".$rowData[0][6]."', '".$rowData[0][7]."', '".$rowData[0][8]."')";
            mysqli_set_charset($this->connectionString,"utf8");
            mysqli_query($this->connectionString, $this->sqlQuery);
            $this->sqlQuery = NULL;
        }
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
        mysqli_set_charset($this->connectionString,"utf8");
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