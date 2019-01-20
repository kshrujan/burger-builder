import React, {Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';

import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        //get the ingredients from the query params
        const query = new URLSearchParams(this.props.location.search);
        let queryIngredients = {};
        let price = 0;
        for(let param of query.entries()) {
            if(param[0] === "price") {
                price = param[1];
            } else {
                queryIngredients[decodeURIComponent(param[0])] = parseInt(decodeURIComponent(param[1]), 10);
            }
        };
        console.log(queryIngredients);
        this.setState({ingredients: queryIngredients, totalPrice: price});
    }


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact');
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancel = {this.checkoutCancelHandler}
                checkoutContinue = {this.checkoutContinueHandler}/>
                <Route path={this.props.match.url + '/contact'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/> 
                {/* //in the case above, we are taking in and distributign the props (i.e. history) down to the ContactData component. We could either do this or simply wrap the component with the withRouter component */}
            </div>
        );
    }
}


export default Checkout;