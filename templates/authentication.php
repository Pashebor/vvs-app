<?php
   include './classes/Mysql.php';
   /*$mysql = new Mysql();
   if($mysql->dbConnect()) {
       $mysql->insertInto('admin', array('NAME'=>'user', 'EMAIL'=>'user@mail.com', 'PASSWORD'=>'54321'));
       $mysql->dbDisconnect();
       echo 'ok';
   }*/

   if ($USER == 'admin') {
       $hidden_value = 'admin_auth';
       $title = 'Авторизация администратора';
   } else {
       $hidden_value = 'user_auth';
       $title = 'Авторизация пользователя';
   }
?>

<section class="auth">
    <h1 class="title"><?echo $title;?></h1>
    <form method="post" action="http://localhost/vvs-app/" class="js-auth">
        <input type="hidden" value="<?echo $hidden_value;?>"/>
        <input type="text" class="input-field" id="name" name="name" placeholder="Логин"/>
        <input type="password" class="input-field"  id="password" name="password" placeholder="Пароль"/>
        <div class="btn-block">
            <a href="http://localhost/vvs-app/" class="btn btn-cancel">назад</a>
            <input type="submit" class="btn btn-submit" value="Войти"/>
        </div>
    </form>
</section>
<script src="assets/js/login.js" type="text/javascript"></script>