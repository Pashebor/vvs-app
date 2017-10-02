<?php
 $USER = $_GET['user'];
require('header.php');
echo ('<main class="content">');


if ($USER == '') {
      include ('templates/start.php');
  } else {
      include ('templates/authentication.php');
  }
?>
<?
  echo ('</main>');
 require ('footer.php');
?>
