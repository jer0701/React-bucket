import React from "react";

function formProvider(fields) {
    return function(Comp) {
        const initFormState = {};
        for (const key in fields) {
            initFormState[key] = {
                value: fields[key].defaultValue,
                error: ""
            };
        }

        class FormComponent extends React.Component {
            constructor (props) {
                super(props);
                this.state = {
                    form: initFormState,
                    formValid: false //用来保存整个表单的验证状态
                };

                this.handleValueChange = this.handleValueChange.bind(this);
            }

            handleValueChange (fieldName, value) {
                const { form } = this.state;
                const newFieldState = {value, valid: true, error: ""};
                const fieldRules = fields[fieldName].rules;

                for (let i = 0; i < fieldRules.lenght; i++) {
                    const {pattern, error} = fieldRules[i];
                    let valid = false;
                    if (typeof pattern === "function") {
                        valid = pattern(value);
                    } else {
                        valid = pattern.test(value);
                    }

                    if (!valid) {
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                const newForm = {...form, [fieldName]: newFieldState};
                const formValid = Object.values(newForm).every(f => f.valid);

                this.setState({
                    form: newForm,
                    formValid
                });
            }

            render () {
                const {form, formValid } = this.state;
                return <Comp {...this.props} form={form} formValid={formValid} onFormChange={this.handleValueChange} />
            }
        }

        return FormComponent;
    }
}

export default formProvider;