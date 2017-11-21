<?php
class Reports{
    private function cyrillicTransliterate($word, $type) {
        $cyrillic = [
            'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п',
            'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я',
            'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П',
            'Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я', ' ', '.',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];
        $latin = [
            'a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p',
            'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya',
            'A','B','V','G','D','E','Io','Zh','Z','I','Y','K','L','M','N','O','P',
            'R','S','T','U','F','H','Ts','Ch','Sh','Sht','A','I','Y','e','Yu','Ya', '_', '_',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];
        if ($type === 'cyr') {
            return mb_strtolower(str_replace($cyrillic, $latin, $word), 'UTF-8');
        } elseif ($type === 'lat') {
            return mb_strtolower(str_replace($latin, $cyrillic, $word), 'UTF-8');
        }
    }
    private function uploadFile ($file, $name, $type) {
        if ( 0 < $file['error'] ) {
            return false;
        }
        else {
            $file_name_no_pref = $this->cyrillicTransliterate($name, 'cyr');
            $file_name = $this->cyrillicTransliterate($name, 'cyr').'_'.$type;
            move_uploaded_file($file['tmp_name'], '../reports/'.$file_name.'.xlsx');
            return array('prefix'=>$file_name, 'no_prefix'=>$file_name_no_pref);
        }
    }
    
     function insertAReport($name, $table_name) {
        $today_date = date('d.m.Y');
        $query = new Mysql();
        if ($query->dbConnect()) {
            $query->insertInto('reports', array('name'=>$name, 'assocName'=>$table_name, 'dCreated'=>$today_date));
            $report_added = $query->selectWhere('reports', 'assocName', '=', $table_name, 'char');
            $query->dbDisconnect();
            return mysqli_fetch_all($report_added, MYSQLI_ASSOC);
        } else {
            return 'error';
        }
    }

    function createReport($file, $name, $type) {
        $callback = $this->uploadFile($file, $name, $type);
        if ($callback['prefix']) {
            $query = new Mysql();
            if ($query->dbConnect()) {
                $query->createList($callback['prefix'], $type);
                $query->dbDisconnect();
                return $callback['no_prefix'];
            }
        } else {
            return 'error';
        }

    }

    function getReports() {
        $sql = new Mysql();
        $data = [];
        if ($sql->dbConnect()) {
            $data = $sql->selectAll('reports');
            $sql->dbDisconnect();
        }
        return mysqli_fetch_all($data, MYSQLI_ASSOC);
    }

    function deleteReport($report_data) {
        $sql = new Mysql();
        if ($sql->dbConnect()) {
            $callback = $sql->deleteTable($report_data['assocName']);
            if($callback) {
                $sql->delete('reports', $report_data['id']);
                $reports = $sql->selectAll('reports');
                return mysqli_fetch_all($reports, MYSQLI_ASSOC);
            }
        } else {
            return false;
        }
    }
}