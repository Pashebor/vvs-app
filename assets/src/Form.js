class Form{
    constructor(formParams) {
        this.form = document.querySelector(`.${formParams.name}`);
    }
    formSubmit() {
        this.form.addEventListener('submit', (event)=> {
            event.preventDefault();
            console.log(this);
        })
    }
}

export default Form;