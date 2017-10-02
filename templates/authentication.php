<?php
   if ($USER == 'admin') {
       $hidden_value = 'admin_auth';
   } else {
       $hidden_value = 'user_auth';
   }
?>

<section class="auth">
    <h1 class="auth__title">Авторизация</h1>
    <form method="post" action="http://localhost/vvs-app/">
        <input type="hidden" value="<? echo $hidden_value;?>"/>
        <input type="text" class="input-field" id="name" name="name" placeholder="Логин"/>
        <input type="password" class="input-field"  id="password" name="password" placeholder="Пароль"/>
        <div class="btn-block">
            <a href="http://localhost/vvs-app/" class="btn btn-cancel">назад</a>
            <input type="submit" class="btn btn-submit" value="Отправить"/>
        </div>
    </form>
</section>