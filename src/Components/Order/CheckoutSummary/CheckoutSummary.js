import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UIComponents/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Looks Good!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger burgerIngredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>Checkout</Button>
        </div>
    );
}


export default checkoutSummary;