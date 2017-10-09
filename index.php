<?php

$USER = $_GET['user'];
require('header.php');

echo ('<main class="content">');
if (isset($_SESSION['USER'])) {
    switch ($_SESSION['USER']) {
        case 'administrator':
            echo ('<h2 style="text-align: center;">Вы вошли как администратор!</h2>');
            break;
        default:
            echo ('<h2>Вы вошли как клиент!</h2>');
            break;
    }
} else {
    if ($USER == '') {
        include ('templates/start.php');
    } else {
        include ('templates/authentication.php');
    }
}

?>
<?
  echo ('</main>');
 require ('footer.php');
?>
