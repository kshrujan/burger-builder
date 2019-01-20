import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let orderIngredients = [];

    for(let ingredientName in props.ingredients) {
        orderIngredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    let ingredientOutput = orderIngredients.map(ig => {
        return <span key={ig.name} style={{textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px"}}><strong>{ig.name}</strong>: ({ig.amount}) </span>
    });
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>$ {parseInt(props.price, 10).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;