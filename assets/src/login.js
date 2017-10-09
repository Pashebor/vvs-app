import Form from './Form';
import {checkUser}  from './utils/ajax.js';

class Login extends Form{
    constructor(params) {
        super(params);
    }

    loginUser() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            checkUser('./utils/login_ajax.php', this.formSubmit())
                .then(json => {
                    console.log(json);
                })
                .catch(err => console.log('error'));
        });
    }

}

export default Login;