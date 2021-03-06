import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
];

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: ${props.price.toFixed(2)}</p>
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added = {() => props.add(ctrl.type)}
                removed ={() => props.remove(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}/>
            ))}
            <button 
            className={classes.OrderButton}
            disabled={!props.checkoutReady}
            onClick = {props.inCart}>Checkout</button>
        </div>
    );
}

export default buildControls;