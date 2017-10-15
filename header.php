<?php
session_start();
$app_root_path = 'http://localhost/vvs-app';
$_GLOBALS['SITE_ROOT_DIR'] = $app_root_path;
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="style.css"/>
    <link rel="stylesheet" type="text/css" href="<?echo $app_root_path?>/admin-app/build/admin_style.css"/>
    <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />
    <title>VVS-info Таможенная статистика</title>
</head>
<body>
<header class="header">
    <div class="logo"><img src="assets/images/logo.png"/></div>
</header>