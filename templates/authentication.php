<?php
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
    <form method="post" action="<?echo $_GLOBALS['SITE_ROOT_DIR']?>" class="js-auth">
        <input type="hidden" value="<?echo $hidden_value;?>"/>
        <?if ($hidden_value == 'user_auth'):?>
            <input type="email" class="input-field" id="name" name="name" placeholder="Email" required/>
        <?else:?>
            <input type="text" class="input-field" id="name" name="name" placeholder="Логин" required/>
        <?endif;?>
        <input type="password" class="input-field"  id="password" name="password" placeholder="Пароль" required/>
        <div class="btn-block">
            <a href="<?echo $_GLOBALS['SITE_ROOT_DIR']?>" class="btn btn-cancel">назад</a>
            <input type="submit" class="btn btn-submit" value="Войти"/>
        </div>
    </form>
</section>
<script src="assets/js/login.js" type="text/javascript"></script>