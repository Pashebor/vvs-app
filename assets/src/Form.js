class Form{
    constructor(formParams) {
        this.form = document.querySelector(`.${formParams.name}`);
    }

    formSubmit() {
        let fields = {};
        let inputs = this.form.querySelectorAll('input');
            for (let i = 0; i < inputs.length -1; i += 1) {
                switch (inputs[i].getAttribute('type')) {
                    case 'hidden':
                        fields.typeUser = inputs[i].value;
                        break;
                    default :
                        fields[inputs[i].getAttribute('name')] = inputs[i].value;
                }
            }
            this.fields = fields;
        return this.fields;
    }
}

export default Form;