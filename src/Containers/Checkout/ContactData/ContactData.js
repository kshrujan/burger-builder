import React, {Component} from 'react';
import Button from '../../../Components/UIComponents/Button/Button';
import classes from './ContactData.css';
import axiosOrders from '../../../axios-orders';
import Loading from '../../../Components/UIComponents/Loading/Loading';
import Input from '../../../Components/UIComponents/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig:  {
                    type: "text",
                    placeholder :"Name"
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig:  {
                    type: "text",
                    placeholder :"Street"
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:  {
                    type: "text",
                    placeholder :"Country"
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:  {
                    type: "number",
                    placeholder :"ZipCode"
                }, 
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:  {
                    type: "email",
                    placeholder :"Email"
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:  {
                    options: [{value: "fastest", displayVal: "Fastest"}, {value: "cheapest", displayVal: "Cheapest"}]
                }, 
                value: '',
                validation: {},
                valid: true
            }
        },
        loading: false,
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElm in this.state.orderForm) {
            formData[formElm] = this.state.orderForm[formElm].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axiosOrders.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false, inCart: false});
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({loading: false, inCart: false});
            });

    }


    checkValidity = (value, rules) => {

        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        //const updatedOrderForm = {...this.state.orderForm}; this does NOT do a deep clone. i.e. the nest obj within the orderForm would not be copied. So if we were to simply update this, we would be affecting state in a mutable fashion which is incorrect! DO THE BELOW!!

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElm = {
            ...updatedOrderForm[inputId]
        };

        updatedFormElm.value = event.target.value;
        updatedFormElm.valid = this.checkValidity(updatedFormElm.value, updatedFormElm.validation);
        updatedFormElm.touched = true;
        updatedOrderForm[inputId] = updatedFormElm;
        

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }

    render() {

        const formElms = [];
        for(let key in this.state.orderForm) {
            formElms.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElms.map(formElm => (
                <Input 
                key = {formElm.id}
                elementType={formElm.config.elementType} elementConfig={formElm.config.elementConfig}
                value={formElm.config.value}
                invalid={!formElm.config.valid}
                shouldValidate = {formElm.config.validation}
                touched = {formElm.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElm.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
        </form>);

        if(this.state.loading) {
            form = <Loading />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Info</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;