<?php

$USER = $_GET['user'];
require('header.php');

echo ('<div class="content">');
if (isset($_SESSION['USER'])) {
    switch ($_SESSION['USER']) {
        case 'administrator':
            echo ('<div id="admin-app"></div>
                   <script type="text/javascript" src="'.$_GLOBALS['SITE_ROOT_DIR'].'/admin-app/build/vvs_admin_app.js" async></script>
                    ');
            break;
        case 'subscriber':
            echo ('<div id="user-app"></div>
                    <script type="text/javascript" src="'.$_GLOBALS['SITE_ROOT_DIR'].'/user-app/build/vvs_user_app.js" async></script>');
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
  echo ('</div>');
 require ('footer.php');
?>
