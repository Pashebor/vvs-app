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
        mysqli_set_charset($this->connectionString,"utf8");
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
    
    function createList($name, $type) {
        switch ($type) {
            case 'r_customers':
                $this->sqlQuery = 'CREATE TABLE '.$name.' (id INT(11) AUTO_INCREMENT NOT NULL,';
                $this->sqlQuery .= 'firm_name VARCHAR (120), recipient_address VARCHAR (250),recipient_country VARCHAR (120),';
                $this->sqlQuery .= 'over_vol_purchases FLOAT, market_share FLOAT, vol_purchases_m FLOAT,';
                $this->sqlQuery .= 'vol_purchases_kg FLOAT, count_purchases INTEGER, PRIMARY KEY (id)';
                $this->sqlQuery .= ') ENGINE = InnoDB DEFAULT CHARSET=utf8';
                mysqli_set_charset($this->connectionString,"utf8");
                mysqli_query($this->connectionString, $this->sqlQuery);
                break;
            case 'r_manufact':
                $this->sqlQuery = 'CREATE TABLE '.$name.' (id INT(11) AUTO_INCREMENT NOT NULL,';
                $this->sqlQuery .= 'procreator VARCHAR (120), country VARCHAR (120),over_vol_purchases FLOAT,';
                $this->sqlQuery .= 'market_share FLOAT, vol_sales_kg FLOAT, vol_sales_m FLOAT,';
                $this->sqlQuery .= 'count_sales INTEGER, PRIMARY KEY (id)';
                $this->sqlQuery .= ') ENGINE = InnoDB DEFAULT CHARSET=utf8';
                mysqli_set_charset($this->connectionString,"utf8");
                mysqli_query($this->connectionString, $this->sqlQuery);
                break;
            case 'r_provider':
                $this->sqlQuery = 'CREATE TABLE '.$name.' (id INT(11) AUTO_INCREMENT NOT NULL,';
                $this->sqlQuery .= 'region VARCHAR (120), supply_dol FLOAT,';
                $this->sqlQuery .= 'market_share FLOAT, supply_kg FLOAT, supply_m FLOAT,';
                $this->sqlQuery .= 'count_supplies INTEGER, PRIMARY KEY (id)';
                $this->sqlQuery .= ') ENGINE = InnoDB DEFAULT CHARSET=utf8';
                mysqli_set_charset($this->connectionString,"utf8");
                mysqli_query($this->connectionString, $this->sqlQuery);
                break;
            case 'r_exporters':
                $this->sqlQuery = 'CREATE TABLE '.$name.' (id INT(11) AUTO_INCREMENT NOT NULL,';
                $this->sqlQuery .= 'num_m2 INTEGER, company_d INTEGER, firm_name VARCHAR (150),';
                $this->sqlQuery .= 'firm_address VARCHAR (250), firm_phone VARCHAR (50), m_field INTEGER,';
                $this->sqlQuery .= 'c_owner VARCHAR (120), address_c_owner  VARCHAR (250), overall_sales_dol FLOAT,';
                $this->sqlQuery .= 'market_share FLOAT, vol_sales_m FLOAT, count_sales INTEGER, PRIMARY KEY (id)';
                $this->sqlQuery .= ') ENGINE = InnoDB DEFAULT CHARSET=utf8';
                mysqli_set_charset($this->connectionString,"utf8");
                mysqli_query($this->connectionString, $this->sqlQuery);
                break;
            case 'c_preferences':
                $this->sqlQuery = 'CREATE TABLE '.$name.' (id INT(11) AUTO_INCREMENT NOT NULL,';
                $this->sqlQuery .= 'g081 INTEGER, s_firm_name VARCHAR (150), s_firm_address VARCHAR (250),';
                $this->sqlQuery .= 'r_firm_name VARCHAR (150), r_firm_address VARCHAR (250), manufacturer VARCHAR (120),';
                $this->sqlQuery .= 'r_country VARCHAR (120), s_country VARCHAR (120), code_tn_ved  INTEGER,';
                $this->sqlQuery .= 'description TEXT, t_shipment VARCHAR (50), shipment_vol_kg FLOAT, shipment_vol_m2 FLOAT,';
                $this->sqlQuery .= 'c_currency VARCHAR (25), shipment_cost FLOAT, cost_price_dol FLOAT, shipment_date VARCHAR(80), PRIMARY KEY (id)';
                $this->sqlQuery .= ') ENGINE = InnoDB DEFAULT CHARSET=utf8';
                mysqli_set_charset($this->connectionString,"utf8");
                mysqli_query($this->connectionString, $this->sqlQuery);
                break;
        }
        
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
        for ($row = 2; $row <= $highestRow; $row++) {
            //  Read a row of data into an array
            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            //  Insert row data array into your database of choice here
            switch ($type) {
                case 'r_customers':
                    $this->sqlQuery = "INSERT INTO " . $name . " (firm_name, recipient_address, recipient_country, over_vol_purchases, market_share, vol_purchases_m, vol_purchases_kg, count_purchases)
			        VALUES ('" . $rowData[0][1] . "', '" . $rowData[0][2] . "', '" . $rowData[0][3] . "', '" . $rowData[0][4] . "', '" . ($rowData[0][5] * 100) . "', '" . $rowData[0][6] . "', '" . $rowData[0][7] . "', '" . $rowData[0][8] . "')";
                    mysqli_set_charset($this->connectionString, "utf8");
                    mysqli_query($this->connectionString, $this->sqlQuery);
                    $this->sqlQuery = NULL;
                    break;
                case 'r_manufact':
                    $this->sqlQuery = "INSERT INTO " . $name . " (procreator, country, over_vol_purchases, market_share, vol_sales_kg, vol_sales_m, count_sales)
			        VALUES ('" . $rowData[0][1] . "', '" . $rowData[0][2] . "', '" . $rowData[0][3] . "', '" . ($rowData[0][4] * 100) . "', '" . ($rowData[0][5] * 100) . "', '" . $rowData[0][6] . "', '" . $rowData[0][7] . "')";
                    mysqli_set_charset($this->connectionString, "utf8");
                    mysqli_query($this->connectionString, $this->sqlQuery);
                    $this->sqlQuery = NULL;
                    break;
                case 'r_provider':
                    $this->sqlQuery = "INSERT INTO " . $name . " (region, supply_dol, market_share, supply_kg, supply_m, count_supplies)
			        VALUES ('".$rowData[0][1]."', '".$rowData[0][2]."', '".($rowData[0][3] * 100)."', '".$rowData[0][4]."', '".$rowData[0][5]."', '".$rowData[0][6]."')";
                    mysqli_set_charset($this->connectionString, "utf8");
                    mysqli_query($this->connectionString, $this->sqlQuery);
                    $this->sqlQuery = NULL;
                    break;
                case 'r_exporters':
                    $this->sqlQuery = "INSERT INTO " . $name . " (num_m2, company_d, firm_name, firm_address, firm_phone, m_field, c_owner, address_c_owner, overall_sales_dol, market_share, vol_sales_m, count_sales)
                    VALUES ('".$rowData[0][1]."', '".$rowData[0][2]."', '".$rowData[0][3]."', '".$rowData[0][4]."', '".$rowData[0][5]."', '".$rowData[0][6]."', '".$rowData[0][7]."', '".$rowData[0][8]."', '".$rowData[0][9]."', '".($rowData[0][10] * 100)."', '".$rowData[0][11]."', '".$rowData[0][12]."')";
                    mysqli_set_charset($this->connectionString, "utf8");
                    mysqli_query($this->connectionString, $this->sqlQuery);
                    $this->sqlQuery = NULL;
                    break;
                case 'c_preferences':
                    $this->sqlQuery = "INSERT INTO " . $name . " (g081, s_firm_name, s_firm_address, r_firm_name, r_firm_address, manufacturer, r_country, s_country, code_tn_ved, description, t_shipment, shipment_vol_kg, shipment_vol_m2, c_currency, shipment_cost, cost_price_dol, shipment_date)
                    VALUES ('".$rowData[0][1]."', '".$rowData[0][2]."', '".$rowData[0][3]."', '".$rowData[0][4]."', '".$rowData[0][5]."', '".$rowData[0][6]."', '".$rowData[0][7]."', '".$rowData[0][8]."', '".$rowData[0][9]."', '".$rowData[0][10]."', '".$rowData[0][11]."', '".$rowData[0][12]."', '".$rowData[0][13]."', '".$rowData[0][14]."', '".$rowData[0][15]."', '".$rowData[0][16]."', '".date('d.m.Y', PHPExcel_Shared_Date::ExcelToPHP($rowData[0][17]))."')";
                    mysqli_set_charset($this->connectionString, "utf8");
                    mysqli_query($this->connectionString, $this->sqlQuery);
                    $this->sqlQuery = NULL;
                    break;
            }
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

    function updateUsers($data, $type) {
        switch ($type) {
            case 'add':
                $this->sqlQuery = "UPDATE users SET REPORT_ID=".$data['reportId'].", ";
                $this -> sqlQuery .= "REPORT_ASSOC_NAME='".$data['reportAssocName']."', REPORT_NAME='".$data['reportName']."' ";
                $this -> sqlQuery .= "WHERE ID=".$data['userId'];
                mysqli_set_charset($this->connectionString,"utf8");
                mysqli_query($this -> connectionString, $this -> sqlQuery);
                $this -> sqlQuery = NULL;
                return true;
                break;
            case 'delete':
                $this->sqlQuery = "UPDATE users SET REPORT_ID=NULL, REPORT_ASSOC_NAME=NULL, REPORT_NAME=NULL WHERE ID=".$data['userId'];
                mysqli_set_charset($this->connectionString,"utf8");
                mysqli_query($this -> connectionString, $this -> sqlQuery);
                $this -> sqlQuery = NULL;
                return true;
                break;
        }
    }

    function selectFreeRun($query)  {
        $this -> dataSet = mysql_query($query,$this -> connectionString);
        return $this -> dataSet;
    }

    function delete($table_name, $id) {
        $this->sqlQuery = "DELETE FROM ".$table_name." WHERE ID=".$id;
        mysqli_set_charset($this->connectionString,"utf8");
        mysqli_query($this -> connectionString, $this -> sqlQuery);
        $this -> sqlQuery = NULL;
    }

    function deleteTable($table_name) {
        $this->sqlQuery = "DROP TABLE IF EXISTS ".$table_name."_r_customers, ";
        $this->sqlQuery .= $table_name."_r_manufact, ".$table_name."_r_provider, ";
        $this->sqlQuery .= $table_name."_r_exporters, ".$table_name."_c_preferences";
        mysqli_set_charset($this->connectionString,"utf8");
        mysqli_query($this -> connectionString, $this -> sqlQuery);
        $this->sqlQuery = NULL;
        return true;
    }

    function freeRun($query)    {
        return mysql_query($query,$this -> connectionString);
    }
}