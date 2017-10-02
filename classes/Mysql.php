<?php
include 'DbConfig.php';

class Mysql extends Dbconfig {
    public $connectionString;
    public $dataSet;
    private $sqlQuery;

    protected $databaseName;
    protected $hostName;
    protected $userName;
    protected $passCode;

    function Mysql()    {
        $this -> connectionString = NULL;
        $this -> sqlQuery = NULL;
        $this -> dataSet = NULL;

        $dbPara = new Dbconfig();
        $this -> databaseName = $dbPara -> dbName;
        $this -> hostName = $dbPara -> serverName;
        $this -> userName = $dbPara -> userName;
        $this -> passCode = $dbPara ->passCode;
        $dbPara = NULL;
    }

    function dbConnect()    {
        $this -> connectionString = mysqli_connect($this -> serverName,$this -> userName,$this -> passCode, $this->databaseName);
        return $this -> connectionString;
    }

    function dbDisconnect() {
        $this -> connectionString = NULL;
        $this -> sqlQuery = NULL;
        $this -> dataSet = NULL;
        $this -> databaseName = NULL;
        $this -> hostName = NULL;
        $this -> userName = NULL;
        $this -> passCode = NULL;
    }

    function selectAll($tableName)  {
        $this -> sqlQuery = 'SELECT * FROM '.$this -> databaseName.'.'.$tableName;
        $this -> dataSet = mysql_query($this -> sqlQuery,$this -> connectionString);
        return $this -> dataSet;
    }

    function selectWhere($tableName,$rowName,$operator,$value,$valueType)   {
        $this -> sqlQuery = 'SELECT * FROM '.$tableName.' WHERE '.$rowName.' '.$operator.' ';
        if($valueType == 'int') {
            $this -> sqlQuery .= $value;
        }
        else if($valueType == 'char')   {
            $this -> sqlQuery .= "'".$value."'";
        }
        $this -> dataSet = mysql_query($this -> sqlQuery,$this -> connectionString);
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
                ($key == 'PASSWORD') ? $string .= "'".md5($value)."'": $string .= "'".$value."'";
            } else {
                ($key == 'PASSWORD') ? $string .= ', '."'".md5($value)."'" : $string .= ', '."'".$value."'";
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